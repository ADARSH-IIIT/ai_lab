function towerOfHanoi(n, source, auxiliary, target) {
    const steps = [];
  
    function moveDisk(disk, from, to) {
      steps.push({ disk, from, to });
    }
  
    function hanoiRecursive(disk, source, auxiliary, target) {
      if (disk === 1) {
        moveDisk(1, source, target);
        return;
      }
  
      hanoiRecursive(disk - 1, source, target, auxiliary);
      moveDisk(disk, source, target);
      hanoiRecursive(disk - 1, auxiliary, source, target);
    }
  
    hanoiRecursive(n, source, auxiliary, target);
  
    return steps;
  }
  
  // Example usage:
  const numberOfDisks = 3;
  const sourcePeg = "A";
  const auxiliaryPeg = "B";
  const targetPeg = "C";
  
  const hanoiSteps = towerOfHanoi(numberOfDisks, sourcePeg, auxiliaryPeg, targetPeg);
  
  // Print all intermediary states
  for (const step of hanoiSteps) {
    console.log(`Move disk ${step.disk} from ${step.from} to ${step.to}`);
  }