export default (min: number, max: number) : number =>{
  return (Math.random() * (max - min + 1) | 0) + min;
};
