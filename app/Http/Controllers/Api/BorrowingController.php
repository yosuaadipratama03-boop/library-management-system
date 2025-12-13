<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Book;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BorrowingController extends Controller
{
    public function index(Request $request)
    {
        $query = Borrowing::with(['user', 'book']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by user (for user's own borrowings)
        if ($request->has('my_borrowings')) {
            $query->where('user_id', $request->user()->id);
        }

        $borrowings = $query->latest()->get();

        return response()->json($borrowings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'borrow_date' => 'required|date',
            'due_date' => 'required|date|after:borrow_date',
            'notes' => 'nullable|string'
        ]);

        $book = Book::findOrFail($request->book_id);

        // Check if book is available
        if ($book->available <= 0) {
            return response()->json([
                'message' => 'Book is not available for borrowing'
            ], 400);
        }

        $borrowing = Borrowing::create([
            'user_id' => $request->user()->id,
            'book_id' => $request->book_id,
            'borrow_date' => $request->borrow_date,
            'due_date' => $request->due_date,
            'status' => 'borrowed',
            'notes' => $request->notes
        ]);

        // Update book availability
        $book->decrement('available');

        return response()->json([
            'message' => 'Book borrowed successfully',
            'borrowing' => $borrowing->load(['user', 'book'])
        ], 201);
    }

    public function show($id)
    {
        $borrowing = Borrowing::with(['user', 'book'])->findOrFail($id);
        return response()->json($borrowing);
    }

    public function update(Request $request, $id)
    {
        $borrowing = Borrowing::findOrFail($id);

        $request->validate([
            'return_date' => 'nullable|date',
            'status' => 'in:borrowed,returned,overdue',
            'notes' => 'nullable|string'
        ]);

        // If returning the book
        if ($request->status === 'returned' && $borrowing->status !== 'returned') {
            $borrowing->return_date = $request->return_date ?? Carbon::now();
            $borrowing->status = 'returned';

            // Update book availability
            $borrowing->book->increment('available');
        }

        $borrowing->update($request->only(['notes']));

        return response()->json([
            'message' => 'Borrowing updated successfully',
            'borrowing' => $borrowing->load(['user', 'book'])
        ]);
    }

    public function destroy($id)
    {
        $borrowing = Borrowing::findOrFail($id);

        // If borrowing is active, return the book first
        if ($borrowing->status === 'borrowed') {
            $borrowing->book->increment('available');
        }

        $borrowing->delete();

        return response()->json([
            'message' => 'Borrowing record deleted successfully'
        ]);
    }

    public function returnBook($id)
    {
        $borrowing = Borrowing::findOrFail($id);

        if ($borrowing->status === 'returned') {
            return response()->json([
                'message' => 'Book already returned'
            ], 400);
        }

        $borrowing->update([
            'return_date' => Carbon::now(),
            'status' => 'returned'
        ]);

        // Update book availability
        $borrowing->book->increment('available');

        return response()->json([
            'message' => 'Book returned successfully',
            'borrowing' => $borrowing->load(['user', 'book'])
        ]);
    }
}