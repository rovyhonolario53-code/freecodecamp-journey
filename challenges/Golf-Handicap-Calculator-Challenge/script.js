function calculateHandicap(scores, pars) {
  const differential = [];
  for (let i = 0; i < scores.length; i++) {
      differential.push(scores[i] - pars[i])
  }
  
  const sum = differential.reduce((sum, current) => sum + current, 0) ;
  const average = sum / differential.length;

  return Math.round(average * 10) / 10; 

}