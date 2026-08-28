import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  // FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KeySquare } from "lucide-react"
import { useForm } from "@inertiajs/react"
import InputError from "./input-error"
import { toast } from "sonner"

export function LoginForm({
  className,
}: React.ComponentProps<"div">) {

  const {data, setData, post, errors, processing} = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try{
      post('/login');
    } catch (error) {
      toast.error('Login Failed, Please Try Again ...')
    } 
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <KeySquare className="size-20 mb-5 mx-auto " />
          <CardTitle className="text-center">Login Admin</CardTitle>
          <CardDescription className="text-center">
            Masukkan Username dan Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" placeholder="Masukkan Password..." onChange={(e) => setData('password',e.target.value)} required />
                <InputError message={errors.password} className="mt-2" />
              </Field>
              <Field>
                <Button type="submit" disabled={processing}>Login</Button>
                {/* <FieldDescription className="text-center"> */}
                  {/* Don&apos;t have an account? <a href="#">Sign up</a> */}
                {/* </FieldDescription> */}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
