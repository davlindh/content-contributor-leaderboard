import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// File upload function
export const uploadFile = async (file, path) => {
    const { data, error } = await supabase.storage
        .from('files_bucket')
        .upload(path, file);
    
    if (error) throw error;
    return data;
};

/* supabase integration types

### content

| name              | type                     | format | required |
|-------------------|--------------------------|--------|----------|
| content_id        | int8                     | number | true     |
| user_id           | int8                     | number | true     |
| project_id        | int8                     | number | false    |
| content_type      | text                     | string | true     |
| content_body      | text                     | string | false    |
| attachment_path   | character varying(255)   | string | false    |
| rating            | numeric                  | number | false    |
| parent_content_id | int8                     | number | false    |
| metadata          | json                     | object | false    |
| created_at        | timestamp with time zone | string | false    |
| updated_at        | timestamp with time zone | string | false    |

### projects

| name                | type                     | format | required |
|---------------------|--------------------------|--------|----------|
| project_id          | int8                     | number | true     |
| user_id             | int8                     | number | true     |
| project_name        | character varying(255)   | string | true     |
| project_description | text                     | string | false    |
| created_at          | timestamp with time zone | string | false    |
| updated_at          | timestamp with time zone | string | false    |

### activitylog

| name              | type                     | format | required |
|-------------------|--------------------------|--------|----------|
| activity_id       | int8                     | number | true     |
| user_id           | int8                     | number | true     |
| related_entity_id | int8                     | number | false    |
| entity_type       | text                     | string | true     |
| activity_type     | text                     | string | true     |
| activity_value    | numeric                  | number | false    |
| activity_details  | json                     | object | false    |
| timestamp         | timestamp with time zone | string | false    |

### users

| name          | type                     | format | required |
|---------------|--------------------------|--------|----------|
| user_id       | int8                     | number | true     |
| username      | character varying(100)   | string | true     |
| email         | character varying(255)   | string | true     |
| password_hash | character varying(255)   | string | true     |
| role          | text                     | string | true     |
| preferences   | json                     | object | false    |
| created_at    | timestamp with time zone | string | false    |
| updated_at    | timestamp with time zone | string | false    |

### collaboration

| name               | type                     | format | required |
|--------------------|--------------------------|--------|----------|
| collaboration_id   | int8                     | number | true     |
| project_id         | int8                     | number | true     |
| user_id            | int8                     | number | true     |
| collaboration_type | text                     | string | true     |
| task_name          | character varying(255)   | string | false    |
| task_description   | text                     | string | false    |
| status             | text                     | string | true     |
| details            | json                     | object | false    |
| due_date           | date                     | string | false    |
| created_at         | timestamp with time zone | string | false    |
| updated_at         | timestamp with time zone | string | false    |

*/

// Content hooks
export const useContents = () => useQuery({
    queryKey: ['contents'],
    queryFn: () => fromSupabase(supabase.from('content').select('*'))
});

export const useContent = (contentId) => useQuery({
    queryKey: ['content', contentId],
    queryFn: () => fromSupabase(supabase.from('content').select('*').eq('content_id', contentId).single())
});

export const useAddContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newContent) => fromSupabase(supabase.from('content').insert([newContent])),
        onSuccess: () => {
            queryClient.invalidateQueries('contents');
        },
    });
};

export const useUpdateContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ contentId, updates }) => fromSupabase(supabase.from('content').update(updates).eq('content_id', contentId)),
        onSuccess: () => {
            queryClient.invalidateQueries('contents');
        },
    });
};

export const useDeleteContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (contentId) => fromSupabase(supabase.from('content').delete().eq('content_id', contentId)),
        onSuccess: () => {
            queryClient.invalidateQueries('contents');
        },
    });
};

// Projects hooks
export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('projects').select('*'))
});

export const useProject = (projectId) => useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fromSupabase(supabase.from('projects').select('*').eq('project_id', projectId).single())
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ projectId, updates }) => fromSupabase(supabase.from('projects').update(updates).eq('project_id', projectId)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectId) => fromSupabase(supabase.from('projects').delete().eq('project_id', projectId)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

// ActivityLog hooks
export const useActivityLogs = () => useQuery({
    queryKey: ['activitylogs'],
    queryFn: () => fromSupabase(supabase.from('activitylog').select('*'))
});

export const useActivityLog = (activityId) => useQuery({
    queryKey: ['activitylog', activityId],
    queryFn: () => fromSupabase(supabase.from('activitylog').select('*').eq('activity_id', activityId).single())
});

export const useAddActivityLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newActivityLog) => fromSupabase(supabase.from('activitylog').insert([newActivityLog])),
        onSuccess: () => {
            queryClient.invalidateQueries('activitylogs');
        },
    });
};

export const useUpdateActivityLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ activityId, updates }) => fromSupabase(supabase.from('activitylog').update(updates).eq('activity_id', activityId)),
        onSuccess: () => {
            queryClient.invalidateQueries('activitylogs');
        },
    });
};

export const useDeleteActivityLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (activityId) => fromSupabase(supabase.from('activitylog').delete().eq('activity_id', activityId)),
        onSuccess: () => {
            queryClient.invalidateQueries('activitylogs');
        },
    });
};

// Users hooks
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*'))
});

export const useUser = (userId) => useQuery({
    queryKey: ['user', userId],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('user_id', userId).single())
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, updates }) => fromSupabase(supabase.from('users').update(updates).eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('users').delete().eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Collaboration hooks
export const useCollaborations = () => useQuery({
    queryKey: ['collaborations'],
    queryFn: () => fromSupabase(supabase.from('collaboration').select('*'))
});

export const useCollaboration = (collaborationId) => useQuery({
    queryKey: ['collaboration', collaborationId],
    queryFn: () => fromSupabase(supabase.from('collaboration').select('*').eq('collaboration_id', collaborationId).single())
});

export const useAddCollaboration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCollaboration) => fromSupabase(supabase.from('collaboration').insert([newCollaboration])),
        onSuccess: () => {
            queryClient.invalidateQueries('collaborations');
        },
    });
};

export const useUpdateCollaboration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ collaborationId, updates }) => fromSupabase(supabase.from('collaboration').update(updates).eq('collaboration_id', collaborationId)),
        onSuccess: () => {
            queryClient.invalidateQueries('collaborations');
        },
    });
};

export const useDeleteCollaboration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (collaborationId) => fromSupabase(supabase.from('collaboration').delete().eq('collaboration_id', collaborationId)),
        onSuccess: () => {
            queryClient.invalidateQueries('collaborations');
        },
    });
};
