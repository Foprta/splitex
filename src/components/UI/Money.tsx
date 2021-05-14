interface Props {
  className?: string;
  amount: number;
}

function Money({ amount, className }: Props) {
  return (
    <span className={"italic " + className}>
      {Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(amount)}
    </span>
  );
}

export default Money;
