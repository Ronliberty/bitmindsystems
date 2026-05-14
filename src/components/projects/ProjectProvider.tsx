"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type ProjectContextType = {
  createOpen: boolean;
  setCreateOpen: (value: boolean) => void;
};

const ProjectContext =
  createContext<ProjectContextType | null>(null);

export function ProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createOpen, setCreateOpen] =
    useState(false);

  return (
    <ProjectContext.Provider
      value={{
        createOpen,
        setCreateOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectUI() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjectUI must be used inside ProjectProvider"
    );
  }

  return context;
}