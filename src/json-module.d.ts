// since we use a default export, we now import it like this
declare module '*.json' {
  const data: any;
  export default data;
}
