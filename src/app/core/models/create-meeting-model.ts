import { ResolutionCreateModel } from './resolution-create-model'


export interface CreateMeetingModel {
    title: string;
    description: string;
    resolutions: ResolutionCreateModel[];
}
