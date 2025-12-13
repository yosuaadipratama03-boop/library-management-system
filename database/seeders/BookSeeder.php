<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'Laravel: Up & Running',
                'author' => 'Matt Stauffer',
                'isbn' => '978-1492041207',
                'publisher' => "O'Reilly Media",
                'publication_year' => 2019,
                'stock' => 5,
                'available' => 5,
                'description' => 'A comprehensive guide to Laravel framework'
            ],
            [
                'title' => 'Clean Code',
                'author' => 'Robert C. Martin',
                'isbn' => '978-0132350884',
                'publisher' => 'Prentice Hall',
                'publication_year' => 2008,
                'stock' => 3,
                'available' => 3,
                'description' => 'A handbook of agile software craftsmanship'
            ],
            [
                'title' => 'Design Patterns',
                'author' => 'Gang of Four',
                'isbn' => '978-0201633610',
                'publisher' => 'Addison-Wesley',
                'publication_year' => 1994,
                'stock' => 4,
                'available' => 4,
                'description' => 'Elements of reusable object-oriented software'
            ]
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}