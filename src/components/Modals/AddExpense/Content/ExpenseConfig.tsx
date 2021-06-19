import Input from "../../../UI/Input";

interface Props {
  amount: number;
  setAmount: (amount: number) => void;
}

function ExpenseConfig({ amount, setAmount }: Props) {
  return (
    <Input
      className="my-2"
      placeholder="Введите деньги"
      value={amount}
      type="number"
      onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
    />
  );
}

export default ExpenseConfig;
