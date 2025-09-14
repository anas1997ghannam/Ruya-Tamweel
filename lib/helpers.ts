import { Project } from "@/types";
export function filterProjectsByType(projects:Project[],type:string){
    return projects.filter((p)=>p.type===type);
}
export function filterProjectsByBudget(projects:Project[],maxBudget:number){
    return projects.filter((p)=>p.budget<=maxBudget);
}
export function searchProjects(projects:Project[],keyword:string){
    return projects.filter((p)=>p.name.includes(keyword)||p.description.includes(keyword));
}