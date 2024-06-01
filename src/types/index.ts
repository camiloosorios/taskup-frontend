import { z } from 'zod';

/** Auth & Users */
const authSchema = z.object({
    name : z.string(),
    email : z.string(),
    currentPassword : z.string(),
    password :  z.string(),
    passwordConfirmation : z.string(),
    token : z.string()
});

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick <Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick <Auth, 'name' | 'email' | 'password' | 'passwordConfirmation'>
export type RequestConfirmationCodeForm = Pick <Auth, 'email' >
export type ForgotPasswordForm = Pick <Auth, 'email' >
export type NewPasswordForm = Pick <Auth, 'password' | 'passwordConfirmation'>
export type UpdateCurrentPasswordForm = Pick <Auth, 'currentPassword' | 'password' | 'passwordConfirmation'>
export type CheckPasswordForm = Pick <Auth, 'password'>
export type ConfirmToken = Pick <Auth, 'token'>

/** Users */

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    id: z.string()
});

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick <User, 'name' | 'email'>

/** Team */

export const teamMemberSchema = userSchema.pick({
    id: true,
    name: true,
    email: true
});

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick <TeamMember, 'email'>

/** Notes */
const noteSchema = z.object({
    id : z.string(),
    content: z.string(),
    createdBy : z.string(),
    task : z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

/** Tasks */

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    id : z.string(),
    name : z.string(),
    description : z.string(),
    project : z.string(),
    status : taskStatusSchema,
    completedBy : z.array(z.object({
        user : userSchema,
        status : z.string()
    })),
    notes : z.array(noteSchema).or(z.null()),
    createdAt : z.string(),
    updatedAt : z.string()    
});

export const taskProjectSchema = taskSchema.pick({
    id: true,
    name : true,
    description : true,
    status : true,
    project : true
});

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = z.infer<typeof taskProjectSchema>

/** Projects */


export const projectSchema = z.object({
    id : z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string(),
    manager: z.string(),
    tasks : z.array(taskProjectSchema),
    team : z.array(userSchema.pick({id: true}))
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        id : true,
        projectName : true,
        clientName : true,
        description : true,
        manager: true,
    })
);

export const editProjectSchema = projectSchema.pick({
    projectName : true,
    clientName : true,
    description : true
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

