const categories = {
  "Task": 'task',
  "Idea": 'idea',
  "Quote": 'quote',
  "Random Though": 'random-thought',
}

export default categories as {[Property in keyof typeof categories]-?: string};
