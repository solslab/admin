import { __Admin } from './admin';
import { __Company } from './company';
import { __Member } from './member';
import { __Position } from './position';
import { __Review } from './review';
import { __Suggestion } from './suggestion';

export namespace API {
	export import Company = __Company;
	export import Position = __Position;
	export import Review = __Review;
	export import Member = __Member;
	export import Admin = __Admin;
	export import Suggestion = __Suggestion;
}
