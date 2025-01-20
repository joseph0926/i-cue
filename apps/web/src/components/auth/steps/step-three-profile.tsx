'use client';

import { profileSchema,ProfileValues } from '@doc-q/db/src/schemas/auth.schema';
import { Button } from '@doc-q/ui/src/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@doc-q/ui/src/components/form';
import { Input } from '@doc-q/ui/src/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useDirtyCheck } from '@/hooks/use-dirty-check';

type StepThreeProfileProps = {
  defaultValues: {
    nickname: string;
    avatarUrl: string;
  };
  onSubmitSuccess: (avatarUrl: string, nickname: string) => void;
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
    onSubmitSuccess(values.avatarUrl || '', values.nickname);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input {...field} placeholder="활동 닉네임" className="placeholder:text-black/50" />
              </FormControl>
              <FormMessage />
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
                  placeholder="https://example.com/my-avatar.png"
                  className="placeholder:text-black/50"
                />
              </FormControl>
              <FormMessage />
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
