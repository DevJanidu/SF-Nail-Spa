"use client";

import * as RadixSelect from "@radix-ui/react-select";

export type SelectOption = { value: string; label: string };

export default function Select({
  name,
  id,
  placeholder,
  options,
  required,
  value,
  onValueChange,
}: {
  name: string;
  id?: string;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <RadixSelect.Root name={name} required={required} value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger id={id} className="ui-select-trigger" aria-label={placeholder}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="ui-select-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="ui-select-content" position="popper" sideOffset={6}>
          <RadixSelect.ScrollUpButton className="ui-select-scroll">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="ui-select-viewport">
            {options.map((opt) => (
              <RadixSelect.Item key={opt.value} value={opt.value} className="ui-select-item">
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="ui-select-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="ui-select-scroll">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
