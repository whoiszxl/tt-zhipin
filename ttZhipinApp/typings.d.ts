declare module '*.jpg';
declare module '*.png';
declare module '*.webp';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.mp4';
declare module '*.json';
declare module '*.js';

declare module 'react-native-refreshable-listview';

type JobEntity = {
    id: string;
    memberInfo: string;
    memberId: string;
    companyId: string;
    jobName: string;
    salaryRangeStart: number;
    salaryRangeEnd: number;
    salaryOptional: {
        payDay: string;
        subsidy: string[];
        basicSalary: number;
        socialSecurity: string;
    };
    workYearRangeStart: number;
    workYearRangeEnd: number;
    ageRangeStart: number;
    ageRangeEnd: number;
    educationAttainment: string;
    jobTags: string;
    jobDescription: string;
    replyCount: number;
    longitude: number;
    latitude: number;
    locationImg: string;
    country: string;
    province: string;
    city: string;
    district: string;
    addressDetail: string;
    createdAt: string;
    updatedAt: string;

    companyResponse: {
        id: string;
        applyMemberId: string;
        companyFullName: string;
        companyAbbrName: string;
        companyLogo: string;
        companyDescription: string;
        companyScale: string;
        financingStage: string;
        industry: string;
        workDateStart: string;
        workDateEnd: string;
        restWay: number;
        overtime: number;
        photo: string;
        employeeWelfare: string;
        mainBusiness: string;
        longitude: number;
        latitude: number;
        country: string;
        province: string;
        city: string;
        district: string;
        addressDetail: string;
    }
}

type MemberInfoEntity = {
    id: string;
    phone: string;
    email: string;
    password: string;
    fullName: string;
    workDate: string;
    wxCode: string;
    birthday: string;
    country: string;
    province: string;
    city: string;
    district: string;
    gender: string;
    avatar: string;
    ip: string;
    loginCount: string;
    loginErrorCount: string;
    lastLogin: string;
    identityStatus: string;
    workStatus: string;
    highestQualification: string;
    highestQualificationType: string;
    isToutou: string;
    status: string;
    token: string;
    location: string;
    browser: string;
}