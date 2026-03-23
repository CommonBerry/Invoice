import { data } from "../../data/readRaw";
import type { Project } from "../../types/projects.ts";

const project = await data();

export function getProjectsByCompleted(): Project[] | null {
  try {
    return (
      project.filter((project: Project) => project.projectCompleted) ?? null
    );
  } catch (error) {
    console.error(`${error}`);
    process.exit(1)
  }
}

export function getProjectsByStarted(): Project[] | null {
  try {
    return project.filter((project: Project) => project.projectStarted) ?? null;
  } catch (error) {
    console.error(`${error}`);
    process.exit(1)
  }
}
