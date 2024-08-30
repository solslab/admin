import { default as SuggestionList } from './list/index.svelte';
import { default as SuggestionRootLite } from './root/lite/index.svelte';

export namespace RCSuggestion {
	export const List = SuggestionList;
	export const RootLite = SuggestionRootLite;
}
