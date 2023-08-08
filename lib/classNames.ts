const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export default classNames;
