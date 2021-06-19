import React, { Fragment, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import classNames from "classnames";

interface Props {
  className?: string;
  value: any;
  onChange: (v: any) => void;
  bindLabel?: string;
  bindValue?: string;
  items: any[];
  placeholder: string;
}

function Select({
  className,
  onChange,
  value,
  items,
  bindValue,
  bindLabel,
  placeholder,
}: React.PropsWithChildren<Props>) {
  const boundLabel = useCallback((item: any) => (bindLabel ? item[bindLabel] : item), [bindLabel]);
  const boundValue = useCallback((item: any) => (bindValue ? item[bindValue] : item), [bindValue]);

  const renderOption = (label: any) => ({ active }) => (
    <div className="relative py-1 px-2">
      <CheckIcon height="18px" className={classNames("absolute text-green-500", { hidden: !active })} />
      <span className={classNames("ml-[26px]", { "text-green-500": active })}>{label}</span>
    </div>
  );

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={classNames(
            "flex justify-between w-full border-[1px] px-2 py-1 border-gray-300 focus:outline-none focus:bg-opacity-70 focus:border-blue-300 rounded-none",
            className
          )}
        >
          {value ? boundLabel(value) : placeholder}
          <ChevronDownIcon width="20px" className="float-right" />
        </Listbox.Button>
        <div className="overflow-hidden absolute top-[calc(100%+2px)] w-full">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <Listbox.Options className="overflow-auto max-h-[150px] bg-white border-[1px] divide-y-[1px]">
              {items.map((item) => (
                <Listbox.Option key={boundValue(item)} value={item}>
                  {renderOption(boundLabel(item))}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
}

export default Select;
