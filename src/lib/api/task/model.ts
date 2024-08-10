export namespace __Model {
	export interface CreatePositionRequest {
		companyId: string;
		position_name: string;
		support_languages: string[];
		test_time?: string;
		problem_info?: string;
		permit_ide?: string;
		permit_search?: string;
		hidden_case?: string;
		exam_mode?: string;
		test_place?: string;
		note?: string;
		token: string;
	}

	export interface UpdatePositionRequest {
		positionId: string;
		position_name: string;
		support_languages: string[];
		test_time?: string | null;
		problem_info?: string | null;
		permit_ide?: string | null;
		permit_search?: string | null;
		hidden_case?: string | null;
		exam_mode?: string | null;
		test_place?: string | null;
		note?: string | null;
		token: string;
	}
}
