import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export function Hero() {
  return (
    <section className='relative overflow-hidden py-12 sm:py-20 md:py-32'>
      {/* Modern decorative elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse hidden sm:block'></div>
      <div className='absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse hidden sm:block' style={{ animationDelay: '1s' }}></div>
      <div className='absolute bottom-40 left-20 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse hidden md:block' style={{ animationDelay: '2s' }}></div>
      <div className='absolute bottom-20 right-10 w-16 h-16 bg-primary/15 rounded-full blur-xl animate-pulse hidden md:block' style={{ animationDelay: '0.5s' }}></div>

      <div className='container mx-auto px-4 relative'>
        <div className='max-w-3xl mx-auto text-center'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-sm font-medium text-primary dark:text-primary-light mb-6 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300'>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Boost your productivity
          </div>

          {/* Headline */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-display'>
            <span className='text-light-500 dark:text-white'>Manage Your Tasks with </span>
            <span className='gradient-text'>Clarity</span>
          </h1>

          {/* Subheadline */}
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
            A clean, professional task management app with beautiful design,
            smooth animations, and an intuitive user experience.
          </p>

          {/* CTAs */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
            <Link href={ROUTES.SIGNUP} className='w-full sm:w-auto'>
              <Button size='lg' className='w-full min-h-[52px] sm:min-h-[48px] group'>
                <span>Get Started Free</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN} className='w-full sm:w-auto'>
              <Button variant='secondary' size='lg' className='w-full min-h-[52px] sm:min-h-[48px]'>
                Sign In
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <p className='mt-8 text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2'>
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            No credit card required • Start organizing in seconds
          </p>
        </div>

        {/* Hero Preview */}
        <div className='mt-16 relative max-w-4xl mx-auto'>
          <div className='glass rounded-2xl overflow-hidden card-cinematic shadow-2xl'>
            {/* Window controls */}
            <div className='bg-light-200/80 dark:bg-dark-200 px-4 py-3 border-b border-light-border dark:border-dark-border flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors' />
              <div className='w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors' />
              <div className='w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors' />
              <span className='ml-4 text-xs text-gray-500 font-medium'>Todo Manager</span>
            </div>

            <div className='p-6 md:p-8 bg-light-100/50 dark:bg-dark-100'>
              {/* Mock task list */}
              <div className='space-y-3'>
                {[
                  { title: 'Complete project proposal', done: true, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                  { title: 'Review design mockups', done: true, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { title: 'Schedule team meeting', done: false, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { title: 'Update documentation', done: false, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                ].map((task, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 group'
                    style={{ animationDelay: i * 0.1 + 's' }}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.done
                        ? 'bg-gradient-to-r from-primary to-secondary border-transparent'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-primary'
                        }`}
                    >
                      {task.done && (
                        <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='3'>
                          <polyline points='20,6 9,17 4,12' />
                        </svg>
                      )}
                    </div>
                    <div className="w-5 h-5 text-primary/60 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={task.icon} />
                      </svg>
                    </div>
                    <span
                      className={`flex-1 font-medium truncate ${task.done
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>



          {/* Animated Developer Credits - Responsive Layout */}
          <div className='mt-12 md:mt-16 flex justify-center perspective-1000'>
            <div className='relative group cursor-default max-w-[90vw]'>
              {/* Outer Glow */}
              <div className='absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse'></div>

              {/* Main Pill Container */}
              <div className='relative px-5 py-3 sm:px-8 sm:py-4 bg-[#050B14] rounded-full leading-none flex items-center justify-center overflow-hidden border border-primary/30 shadow-[0_0_15px_rgba(37,99,235,0.5)]'>

                {/* Shine Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] animate-shine" />
                </div>

                {/* Text Content */}
                <span className="text-xs sm:text-base md:text-lg font-semibold bg-gradient-to-r from-primary-light via-blue-300 to-primary-light bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] whitespace-nowrap">
                  Todo App developed by Usama Muzammil
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
