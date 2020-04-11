export interface FeedingEventBoard{
	id?: string;
	board_creation_time?: string;
	events?: FeedingEvent[];
}
export interface FeedingEvent {
	time_sec?: number;
	type?: 'breastfeed' | 'formula';
	editor?: string;
}