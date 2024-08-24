import { __Model } from '@src/lib/api/company/model';
import { writable } from 'svelte/store';

export const companyDetailData = writable<any>(null);
export const companyPositionData = writable<any[]>([]);


export namespace Companies {
    export const industryOptions: __Model.IndustryType[] = [
        'IT 서비스',
        '금융',
        '솔루션',
        '게임',
        'SI',
        'SM',
        '빅테크',
        '스타트업',
        '대기업',
        '중견기업',
        '중소기업',
        '공기업'
    ];

    export 	const validLanguages = [
		'C',
		'C++',
		'C/C++',
		'C#',
		'Java',
		'JavaScript',
		'Kotlin',
		'Python',
		'Go',
		'Ruby',
		'Scala',
		'Swift',
		'SQL',
		'Oracle'
	];


    export interface CreatePositionRequest {
		companyId: string;
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
	}
    
}