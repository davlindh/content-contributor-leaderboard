import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddContent } from '../integrations/supabase';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '../integrations/supabase';

const UserPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const addContent = useAddContent();
  const { toast } = useToast();
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      let attachmentPath = null;
      if (file) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('files_bucket')
          .upload(`content/${Date.now()}_${file.name}`, file);

        if (uploadError) throw uploadError;
        attachmentPath = uploadData.path;
      }

      const newContent = {
        ...data,
        user_id: 1, // Replace with actual user ID when authentication is implemented
        content_type: 'text',
        attachment_path: attachmentPath,
      };

      await addContent.mutateAsync(newContent);
      toast({
        title: "Content added successfully",
        description: "Your content has been uploaded and saved.",
      });
      reset();
      setFile(null);
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Error",
        description: "There was an error adding your content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Add Content</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="content_body" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <Textarea id="content_body" {...register('content_body')} className="w-full" rows={4} />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
          <Input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <Button type="submit" className="w-full">Add Content</Button>
      </form>
    </div>
  );
};

export default UserPage;
