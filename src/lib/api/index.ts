import { __Company } from './company';
import { __Task } from './task';
import { __Review } from './review';
import { __Member } from './member';
import { __Admin } from './admin';

export namespace API {
	export import Company = __Company;
	export import Task = __Task;
	export import Review = __Review;
	export import Member = __Member;
	export import Admin = __Admin;
}
