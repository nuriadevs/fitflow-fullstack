'use client'

import Link from 'next/link'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.grid}>
          <div className={s.section}>
            <h3 className={s.title}>FitFlow</h3>
            <p className={s.text}>
            Your personal fitness partner. Get personalized tips and track your progress.
            </p>
          </div>
          <div className={s.section}>
            <h3 className={s.title}>Links</h3>
            <ul className={s.section}>
              <li>
                <Link href="/" className={s.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className={s.link}>
                Log In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className={s.link}>
                Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className={s.section}>
            <h3 className={s.title}>Contact</h3>
            <ul className={s.section}>
              <li className={s.text}>Email: info@fitflow.com</li>
              <li className={s.text}>Phone: 000 00 00 </li>
            </ul>
          </div>
        </div>
        <div className={s.divider}>
          <p className={s.copyright}>
            © {new Date().getFullYear()} FitFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 