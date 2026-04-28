import { ChevronLeft, Target, Eye, Heart, Users, Award, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src="images/hero.png" 
          alt="About Hadramedia" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">عن حضرميديا</h1>
            <p className="text-blue-100 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed opacity-90">
              صوت حضرموت الحر ومنصتكم الإخبارية المستقلة لنقل الخبر والتحقيق والقصة من قلب الحدث.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          {[
            { label: 'مراسل في الميدان', value: '25+', icon: Users, color: 'bg-blue-600' },
            { label: 'تحقيق استقصائي', value: '150+', icon: Target, color: 'bg-red-600' },
            { label: 'متابع شهرياً', value: '500K', icon: Eye, color: 'bg-teal-600' },
            { label: 'جائزة إبداع', value: '12', icon: Award, color: 'bg-orange-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className={`${stat.color} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-6 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <span className="text-2xl md:text-3xl font-black text-[#09264d] mb-1">{stat.value}</span>
              <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            <Target className="text-red-600 mb-8 relative z-10" size={48} />
            <h2 className="text-3xl font-black text-[#09264d] mb-6 relative z-10">رؤيتنا</h2>
            <p className="text-slate-600 text-lg font-bold leading-loose relative z-10">
              أن نكون المرجع الأول والموثوق للمواطن الحضرمي في الداخل والمهجر، وللمتابعين للشأن اليمني والإقليمي، من خلال تقديم صحافة استقصائية مهنية تتسم بالعمق والجرأة والموضوعية.
            </p>
          </div>
          <div className="bg-[#09264d] rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700" />
            <Eye className="text-red-600 mb-8 relative z-10" size={48} />
            <h2 className="text-3xl font-black text-white mb-6 relative z-10">رسالتنا</h2>
            <p className="text-blue-100 text-lg font-bold leading-loose relative z-10">
              الالتزام بنقل الحقيقة كما هي، وتسليط الضوء على القضايا المسكوت عنها، وتعزيز قيم الشفافية والمساءلة، والمساهمة في بناء وعي مجتمعي يسهم في تنمية واستقرار حضرموت واليمن.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#09264d] mb-4">قيمنا الجوهرية</h2>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'الاستقلالية', desc: 'نعمل بتمويل ذاتي وقرار تحريري مستقل بعيداً عن التجاذبات السياسية.', icon: Shield },
              { title: 'المصداقية', desc: 'نتحرى الدقة في كل خبر ونعتمد على مصادر موثقة ووثائق رسمية.', icon: Award },
              { title: 'الإنسانية', desc: 'ننحاز دوماً لقضايا الإنسان وحقوقه واحتياجاته الأساسية.', icon: Heart },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-slate-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-[#09264d] mb-4">{value.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="flex-1 text-center md:text-right relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#09264d] mb-6">كن جزءاً من الحقيقة</h2>
            <p className="text-slate-500 text-lg md:text-xl font-bold leading-loose mb-10">
              نحن في حضرميديا نؤمن بأن الخبر ملك للجميع، شاركنا برأيك أو أرسل لنا معلوماتك بسرية تامة.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-[#09264d] hover:bg-blue-900 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3">
                <Mail size={20} /> تواصل معنا
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-black transition-all flex items-center gap-3">
                <Users size={20} /> انضم للفريق
              </button>
            </div>
          </div>
          <div className="md:w-1/3 grid grid-cols-1 gap-6 relative z-10">
            {[
              { icon: MapPin, text: 'حضرموت، المكلا، شارع الميناء' },
              { icon: Phone, text: '+967 5 300000' },
              { icon: Mail, text: 'info@hadramedia.com' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm shrink-0">
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-700 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-50 rounded-full opacity-50 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
