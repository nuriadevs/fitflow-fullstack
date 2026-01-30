import { AvatarDemo } from '@/components/chat/avatar-chat';
import { getUser } from '@/lib/auth/get-user';
import { redirect } from 'next/navigation';
import { Star, Dumbbell, Target, Award } from 'lucide-react';

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect('/signin');
    }

    const exercisesCompleted = 7;
    const exercisesTotal = 12; 
    const currentStreak = 3;

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden">
                {/* Header horizontal con gradiente y estrellas */}
                <div className="relative bg-linear-to-r from-gray-300/20 via-gray-200/10 to-transparent p-6 md:p-8">
                    {/* Estrellas decorativas */}
                    <Star className="absolute top-4 left-8 h-4 w-4 text-red-400 fill-red-400" aria-hidden="true" />
                    <Star className="absolute top-6 right-12 h-3 w-3 text-red-400 fill-red-400" aria-hidden="true" />
                    <Star className="absolute bottom-6 left-1/4 h-3 w-3 text-red-400 fill-red-400" aria-hidden="true" />
                    <Star className="absolute top-4 right-6 h-5 w-5 text-red-400 fill-red-400" aria-hidden="true" />

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Ícono de animación */}
                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                                <Dumbbell className="h-10 w-10 text-red-500" aria-hidden="true" />
                            </div>
                        </div>
                        
                        {/* Texto de bienvenida */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                Welcome back, {user.username || user.email}!
                            </h1>
                            <p className="text-muted-foreground">
                                Keep up the great work with your training routine
                            </p>
                        </div>
                    </div>
                </div>

                {/* Estadísticas en grid responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x border-t">
                    {/* Ejercicios completados */}
                    <div className="p-6 text-center hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-center mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                <Dumbbell className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{exercisesCompleted}</div>
                        <div className="text-sm text-muted-foreground">Exercises Completed</div>
                    </div>

                    {/* Total de ejercicios */}
                    <div className="p-6 text-center hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-center mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <Target className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{exercisesTotal}</div>
                        <div className="text-sm text-muted-foreground">Total Exercises</div>
                    </div>

                    {/* Progreso */}
                    <div className="p-6 text-center hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-center mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <Award className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {Math.round((exercisesCompleted / exercisesTotal) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                    </div>

                    {/* Racha actual */}
                    <div className="p-6 text-center hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-center mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                                <Star className="h-6 w-6 text-orange-600 fill-orange-600" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{currentStreak}</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                </div>

                {/* Información adicional del usuario */}
                <div className="p-6 bg-muted/30 border-t">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <AvatarDemo />
                            </div>
                            <div>
                                {user.username && (
                                    <p className="font-medium text-foreground text-sm">@{user.username}</p>
                                )}
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                Active
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                Verified
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}