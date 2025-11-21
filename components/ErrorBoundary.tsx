import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 text-center dir-rtl">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 border-4 border-white shadow-xl">
            <AlertTriangle size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">عذراً، حدث خطأ غير متوقع</h1>
          <p className="text-slate-500 mb-8 max-w-md text-lg leading-relaxed">
            نواجه مشكلة تقنية بسيطة. فريقنا التقني يعمل على إصلاحها الآن. يرجى محاولة تحديث الصفحة.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center gap-3 shadow-lg shadow-blue-900/20 hover:scale-105"
          >
            <RefreshCw size={20} /> إعادة تحميل الصفحة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;