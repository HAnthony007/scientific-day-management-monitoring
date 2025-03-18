<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $events = Event::all();
        return response()->json([
            'data' => $events,
            'msg' => null
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'date_deb' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_deb',
            'lieu' => 'required|string|max:255',
            'organisateur_id' => 'required|exists:users,id_user'
        ]);
        $event = Event::create($validated);

        return response()->json([
            'data' => $event,
            'msg' => 'Event add successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                'data' => null,
                'msg' => 'Événement non trouvé'
            ], 200);
        }

        return response()->json([
            'data' => $event,
            'msg' => null
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'date_deb' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after_or_equal:date_deb',
            'lieu' => 'sometimes|string|max:255',
            'organisateur_id' => 'sometimes|exists:users,id_user'
        ]);

        $event->update($validated);

        return response()->json([
            'data' => $event,
            'msg' => 'Event update successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        $event->delete();

        return response()->json([
            'data' => null,
            'msg' => 'Event deleted successfully'
        ], 200);
    }
}
