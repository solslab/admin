export namespace __Model {
	export interface CreatePositionRequest {
		companyId: string;
		position_name: string;
		is_official: boolean;
		support_languages: string[];
		test_time?: string | null;
		problem_info?: string | null;
		permit_ide?: string | null;
		permit_search?: string | null;
		hidden_case?: string | null;
		exam_mode?: string | null;
		test_place?: string | null;
		note?: string | null;
	}

	export interface UpdatePositionRequest {
		positionId: string;
		position_name: string;
		is_official: boolean;
		support_languages: string[];
		test_time?: string | null;
		problem_info?: string | null;
		permit_ide?: string | null;
		permit_search?: string | null;
		hidden_case?: string | null;
		exam_mode?: string | null;
		test_place?: string | null;
		note?: string | null;
	}
}
