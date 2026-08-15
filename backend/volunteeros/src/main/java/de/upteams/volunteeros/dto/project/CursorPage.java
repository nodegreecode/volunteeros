package de.upteams.volunteeros.dto.project;

import java.util.List;

public record CursorPage<T>(List<T> projects, String nextCursor, String previousCursor) {
}
