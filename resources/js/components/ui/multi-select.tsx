import * as React from "react"
import { Check, X, ChevronsUpDown, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface MultiSelectContextProps {
  selected: string[]
  onChange: (value: string[]) => void
  open: boolean
  setOpen: (open: boolean) => void
  options: { value: string; label: string; icon?: React.ComponentType<{ className?: string }> }[]
  registerOption: (option: { value: string; label: string; icon?: React.ComponentType<{ className?: string }> }) => void
}

const MultiSelectContext = React.createContext<MultiSelectContextProps | undefined>(undefined)

function useMultiSelect() {
  const context = React.useContext(MultiSelectContext)
  if (!context) {
    throw new Error("MultiSelect components must be used within a MultiSelect")
  }
  return context
}

export interface MultiSelectProps {
  children?: React.ReactNode
  selected?: string[]
  values?: string[]
  value?: string[]
  onChange?: (selected: string[]) => void
  onValuesChange?: (values: string[]) => void
  onValueChange?: (values: string[]) => void
  className?: string
}

export function MultiSelect({
  children,
  selected: selectedProp,
  values: valuesProp,
  value: valueProp,
  onChange: onChangeProp,
  onValuesChange: onValuesChangeProp,
  onValueChange: onValueChangeProp,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<{ value: string; label: string; icon?: React.ComponentType<{ className?: string }> }[]>([])

  const selected = selectedProp ?? valuesProp ?? valueProp ?? []
  const onChange = (newValues: string[]) => {
    if (onChangeProp) onChangeProp(newValues)
    if (onValuesChangeProp) onValuesChangeProp(newValues)
    if (onValueChangeProp) onValueChangeProp(newValues)
  }

  const registerOption = React.useCallback((option: { value: string; label: string; icon?: React.ComponentType<{ className?: string }> }) => {
    setOptions((prev) => {
      if (prev.some((o) => o.value === option.value)) return prev
      return [...prev, option]
    })
  }, [])

  return (
    <MultiSelectContext.Provider value={{ selected, onChange, open, setOpen, options, registerOption }}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className={cn("w-full", className)}>{children}</div>
      </Popover>
    </MultiSelectContext.Provider>
  )
}

export function MultiSelectTrigger({
  className,
  placeholder = "Pilih opsi...",
  children,
}: {
  className?: string
  placeholder?: string
  children?: React.ReactNode
}) {
  const { selected, onChange, open, setOpen, options } = useMultiSelect()

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn(
          "w-full justify-between h-auto min-h-10 px-3 py-2 hover:bg-background",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex gap-1 flex-wrap items-center">
          {children ? (
            children
          ) : selected.length > 0 ? (
            selected.map((item) => {
              const option = options.find((o) => o.value === item)
              const IconComponent = option?.icon
              return (
                <Badge
                  key={item}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-0.5"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUnselect(item)
                  }}
                >
                  {IconComponent && <IconComponent className="h-3 w-3 text-muted-foreground" />}
                  {option?.label || item}
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-pointer" />
                </Badge>
              )
            })
          ) : (
            <span className="text-muted-foreground font-normal">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {selected.length > 0 && (
            <XCircle
              className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onChange([])
              }}
            />
          )}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </Button>
    </PopoverTrigger>
  )
}

export function MultiSelectValue({ placeholder }: { placeholder?: string }) {
  const { selected, options } = useMultiSelect()
  if (selected.length === 0) return <span className="text-muted-foreground">{placeholder}</span>
  return <span>{selected.map((s) => options.find((o) => o.value === s)?.label || s).join(", ")}</span>
}

export function MultiSelectContent({ children }: { children: React.ReactNode }) {
  return (
    <PopoverContent className="w-full p-0" align="start">
      <Command>{children}</Command>
    </PopoverContent>
  )
}

export function MultiSelectGroup({ children, heading }: { children: React.ReactNode; heading?: string }) {
  return <CommandGroup heading={heading}>{children}</CommandGroup>
}

export function MultiSelectItem({
  value,
  label,
  icon: Icon,
  children,
}: {
  value: string
  label?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}) {
  const { selected, onChange, setOpen, registerOption } = useMultiSelect()
  const isSelected = selected.includes(value)
  const itemLabel = label || (typeof children === "string" ? children : value)

  React.useEffect(() => {
    registerOption({ value, label: itemLabel, icon: Icon })
  }, [value, itemLabel, Icon, registerOption])

  return (
    <CommandItem
      onSelect={() => {
        if (isSelected) {
          onChange(selected.filter((item) => item !== value))
        } else {
          onChange([...selected, value])
        }
        setOpen(true)
      }}
    >
      <div
        className={cn(
          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "opacity-50 [&_svg]:invisible"
        )}
      >
        <Check className={cn("h-4 w-4")} />
      </div>
      {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
      <span>{children || label || value}</span>
    </CommandItem>
  )
}

export function MultiSelectSearch({ placeholder = "Cari..." }: { placeholder?: string }) {
  return <CommandInput placeholder={placeholder} />
}

export function MultiSelectList({ children }: { children: React.ReactNode }) {
  return (
    <CommandList>
      <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
      {children}
    </CommandList>
  )
}