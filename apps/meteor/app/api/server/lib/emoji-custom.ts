import { IEmojiCustom } from '@rocket.chat/core-typings';
import { SortOptionObject } from 'mongodb';

import { EmojiCustom } from '../../../models/server/raw';

// TO-DO: use PaginatedRequest and PaginatedResult
export async function findEmojisCustom({
	query = {},
	pagination: { offset, count, sort },
}: {
	query: {};
	pagination: { offset: number; count: number; sort: SortOptionObject<IEmojiCustom> };
}): Promise<{
	emojis: IEmojiCustom[];
	count: number;
	offset: number;
	total: number;
}> {
	const cursor = EmojiCustom.find(query, {
		sort: sort || { name: 1 },
		skip: offset,
		limit: count,
	});

	const total = await cursor.count();

	const emojis = await cursor.toArray();

	return {
		emojis,
		count: emojis.length,
		offset,
		total,
	};
}
