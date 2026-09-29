<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookSeries;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BookVolumeOrderController extends Controller
{
    public function index(Request $request): Response
    {
        $seriesList = BookSeries::query()
            ->withCount('books')
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Books/VolumeOrder', [
            'seriesList' => $seriesList,
        ]);
    }

    public function getVolumesBySeries(string $seriesId): JsonResponse
    {
        if ($seriesId === 'none' || !$seriesId) {
            return response()->json([
                'volumes' => [],
            ]);
        }

        $volumes = Book::query()
            ->where('series_id', $seriesId)
            ->orderBy('sort_order')
            ->orderBy('volume')
            ->get([
                'id',
                'title',
                'volume',
                'sort_order',
            ]);

        return response()->json([
            'volumes' => $volumes->map(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'volume' => $book->volume,
                    'sort_order' => $book->sort_order,
                ];
            }),
        ]);
    }

    public function updateOrder(Request $request): JsonResponse
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:books,id',
            'orders.*.sort_order' => 'required|integer|min:0',
        ]);

        DB::transaction(function () use ($request) {
            foreach ($request->input('orders') as $order) {
                Book::where('id', $order['id'])->update([
                    'sort_order' => $order['sort_order'],
                ]);
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Urutan volume berhasil diperbarui.',
        ]);
    }
}
