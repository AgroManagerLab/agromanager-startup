import { getDatabase } from '../../../global/database';

export function findMilkmanIdByEmail(normalizedEmail: string): string | undefined {
	const db = getDatabase();
	const row = db.getFirstSync<{ id: string }>(
		'SELECT id FROM milkmen WHERE lower(email) = ?;',
		[normalizedEmail],
	);
	return row ? row.id : undefined;
}

