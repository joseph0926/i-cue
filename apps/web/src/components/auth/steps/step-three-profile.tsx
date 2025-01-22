'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileValues } from '@icue/db/src/schemas/auth.schema';
import { Button } from '@icue/ui/src/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@icue/ui/src/components/form';
import { Input } from '@icue/ui/src/components/input';
import { useForm, useWatch } from 'react-hook-form';
import { useDirtyCheck } from '@/hooks/use-dirty-check';

type StepThreeProfileProps = {
  defaultValues: {
    name: string;
    avatarUrl: string;
  };
  onSubmitSuccess: (avatarUrl: string, name: string) => void;
};

export function StepThreeProfile({ defaultValues, onSubmitSuccess }: StepThreeProfileProps) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { isDirty } = form.formState;

  useWatch({ control: form.control });

  useDirtyCheck(isDirty);

  const handleSubmit = async (values: ProfileValues) => {
    form.clearErrors('root');
    onSubmitSuccess(values.avatarUrl || '', values.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="활동 닉네임"
                  className="placeholder:text-black/50 placeholder:dark:text-white/50"
                />
              </FormControl>
              <FormMessage className="text-rose-600 dark:text-rose-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아바타 이미지 URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/shadcn.png"
                  className="placeholder:text-black/50 placeholder:dark:text-white/50"
                />
              </FormControl>
              <FormMessage className="text-rose-600 dark:text-rose-500" />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" className="mt-2">
          프로필 설정 완료
        </Button>
      </form>
    </Form>
  );
}
