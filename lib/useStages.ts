import { useState } from 'react';

class StageManager {
  private stages: { [key: number]: string } = {};

  constructor(stages: string[]) {
    stages.forEach((stage, index) => {
      this.stages[index] = stage;
    });
  }

  getPrevious(stage: number) {
    if (stage === 0) {
      throw new Error('Not possible! There is no previous stage.');
    }
    if (this.stages[stage] === undefined) {
      throw new Error('Stage not present.');
    }
    return stage - 1;
  }

  getNext(stage: number) {
    if (stage >= Object.values(this.stages).length - 1) {
      throw new Error('Not possible! There is no next stage.');
    }
    if (this.stages[stage] === undefined) {
      throw new Error('Stage not present.');
    }
    return stage + 1;
  }

  getStageName(stage: number) {
    if (this.stages[stage] === undefined) {
      throw new Error('Stage not present.');
    }
    return this.stages[stage];
  }

  getStart() {
    return 0;
  }

  getLast() {
    return Object.values(this.stages).length - 1;
  }
}

export function useStages(stages: string[]) {
  const stageManger = new StageManager(stages);
  const [stage, setStage] = useState<number>(stageManger.getStart());

  function getNextStage() {
    const next = stageManger.getNext(stage);
    setStage(next);
    return stageManger.getStageName(next);
  }

  function getPreviousStage() {
    const previous = stageManger.getPrevious(stage);
    setStage(previous);
    return stageManger.getStageName(previous);
  }

  function reset() {
    setStage(stageManger.getStart());
  }

  return {
    getStage: stageManger.getStageName.bind(stageManger, stage),
    next: getNextStage,
    previous: getPreviousStage,
    isInitial: stage === stageManger.getStart(),
    isLast: stage === stageManger.getLast(),
    reset,
  };
}
