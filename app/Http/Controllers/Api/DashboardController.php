<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalBooks = Book::count();
        $totalUsers = User::count();
        $activeBorrowings = Borrowing::where('status', 'borrowed')->count();
        $totalBorrowings = Borrowing::count();

        $recentBorrowings = Borrowing::with(['user', 'book'])
            ->latest()
            ->limit(5)
            ->get();

        $popularBooks = Book::withCount('borrowings')
            ->orderBy('borrowings_count', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'stats' => [
                'total_books' => $totalBooks,
                'total_users' => $totalUsers,
                'active_borrowings' => $activeBorrowings,
                'total_borrowings' => $totalBorrowings
            ],
            'recent_borrowings' => $recentBorrowings,
            'popular_books' => $popularBooks
        ]);
    }
}