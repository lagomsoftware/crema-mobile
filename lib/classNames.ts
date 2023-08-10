const classNames = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default classNames;
