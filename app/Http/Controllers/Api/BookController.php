<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::withCount('activeBorrowings')->get();
        return response()->json($books);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1000|max:' . date('Y'),
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string'
        ]);

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'publisher' => $request->publisher,
            'publication_year' => $request->publication_year,
            'stock' => $request->stock,
            'available' => $request->stock, // Initially all books are available
            'description' => $request->description,
            'cover_image' => $request->cover_image
        ]);

        return response()->json([
            'message' => 'Book created successfully',
            'book' => $book
        ], 201);
    }

    public function show($id)
    {
        $book = Book::with(['borrowings' => function($query) {
            $query->latest()->limit(5);
        }])->findOrFail($id);
        
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        
        $request->validate([
            'title' => 'string|max:255',
            'author' => 'string|max:255',
            'isbn' => 'string|unique:books,isbn,' . $id,
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1000|max:' . date('Y'),
            'stock' => 'integer|min:0',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string'
        ]);

        // Calculate available books
        if ($request->has('stock')) {
            $borrowed = $book->activeBorrowings()->count();
            $available = $request->stock - $borrowed;
            $book->available = max(0, $available);
        }

        $book->update($request->except('available'));

        return response()->json([
            'message' => 'Book updated successfully',
            'book' => $book
        ]);
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        
        // Check if book has active borrowings
        if ($book->activeBorrowings()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete book with active borrowings'
            ], 400);
        }

        $book->delete();

        return response()->json([
            'message' => 'Book deleted successfully'
        ]);
    }
}