// Login — Comum a todos os perfis (REQ-01.1, REQ-01.3)
// Generous tap targets, brand-led, error state visible

// Cow illustration — geometric front-view, using brand palette
//  · body / head: surface white
//  · spots: pasture green (primary)
//  · horns + ear inner: amber/wheat (accent)
//  · snout: warm cream
function CowMark({ size = 156 }) {
  const green = 'oklch(0.42 0.085 150)';
  const greenDeep = 'oklch(0.32 0.085 150)';
  const amber = 'oklch(0.74 0.140 75)';
  const amberSoft = 'oklch(0.85 0.080 75)';
  const cream = 'oklch(0.93 0.030 60)';
  const ink = 'oklch(0.22 0.018 240)';
  const w = size, h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 160 160" aria-label="Vaca">
      {/* soft pasture circle behind */}
      <circle cx="80" cy="82" r="74" fill="oklch(0.94 0.035 150)" />
      {/* grass line */}
      <path d="M 8 130 Q 30 124 50 130 T 90 130 T 130 130 T 156 128" stroke={green} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* ears — outer */}
      <ellipse cx="36" cy="64" rx="18" ry="11" fill="#fff" stroke={greenDeep} strokeWidth="2.5" transform="rotate(-25 36 64)" />
      <ellipse cx="124" cy="64" rx="18" ry="11" fill="#fff" stroke={greenDeep} strokeWidth="2.5" transform="rotate(25 124 64)" />
      {/* ears — inner amber */}
      <ellipse cx="36" cy="64" rx="9" ry="5" fill={amberSoft} transform="rotate(-25 36 64)" />
      <ellipse cx="124" cy="64" rx="9" ry="5" fill={amberSoft} transform="rotate(25 124 64)" />

      {/* horns */}
      <path d="M 60 36 Q 56 24 50 26" stroke={amber} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 100 36 Q 104 24 110 26" stroke={amber} strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* head */}
      <path d="M 32 70 Q 32 36 80 36 Q 128 36 128 70 L 128 96 Q 128 130 80 130 Q 32 130 32 96 Z"
            fill="#fff" stroke={greenDeep} strokeWidth="2.8" strokeLinejoin="round" />

      {/* spots */}
      <path d="M 50 58 Q 42 50 50 44 Q 62 42 64 52 Q 64 62 56 64 Q 48 64 50 58 Z" fill={green} />
      <path d="M 108 96 Q 100 92 102 84 Q 108 78 116 82 Q 122 90 118 98 Q 112 102 108 96 Z" fill={green} />

      {/* eyes */}
      <ellipse cx="62" cy="80" rx="5" ry="6" fill={ink} />
      <ellipse cx="98" cy="80" rx="5" ry="6" fill={ink} />
      <circle cx="60.5" cy="78" r="1.6" fill="#fff" />
      <circle cx="96.5" cy="78" r="1.6" fill="#fff" />

      {/* snout */}
      <ellipse cx="80" cy="108" rx="24" ry="16" fill={cream} stroke={greenDeep} strokeWidth="2.5" />
      {/* nostrils */}
      <ellipse cx="71" cy="106" rx="2.4" ry="3.2" fill={greenDeep} />
      <ellipse cx="89" cy="106" rx="2.4" ry="3.2" fill={greenDeep} />
      {/* mouth */}
      <path d="M 71 117 Q 80 122 89 117" stroke={greenDeep} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function LoginScreen({ variant = 'default' }) {
  const showError = variant === 'error';
  return (
    <Phone bg={MR.bg}>
      <div style={{ paddingTop: 70, paddingLeft: 28, paddingRight: 28, paddingBottom: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* brand + hero illustration */}
        <div style={{ marginTop: 8, marginBottom: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <CowMark size={156} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, color: MR.ink, lineHeight: 1 }}>
              Milk<span style={{ color: MR.primary }}>Route</span>
            </div>
            <div style={{ fontSize: 13, color: MR.ink2, marginTop: 6, fontWeight: 600 }}>
              Coleta de leite cooperada
            </div>
          </div>
        </div>

        {/* welcome */}
        <div style={{ marginTop: 8, marginBottom: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: MR.ink, lineHeight: 1.1 }}>
            Bem-vindo de volta
          </div>
          <div style={{ fontSize: 14, color: MR.ink2, marginTop: 6, fontWeight: 500 }}>
            Entre com a sua conta da cooperativa
          </div>
        </div>

        {/* form */}
        <Field
          label="E-mail"
          value={showError ? 'ricardo@coopvaleleite.coop.br' : 'ricardo@coopvaleleite.coop.br'}
          placeholder="seu@email.com.br"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={MR.ink3} strokeWidth="1.8"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>}
        />
        <Field
          label="Senha"
          value={showError ? '••••' : '••••••••'}
          placeholder="Sua senha"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={MR.ink3} strokeWidth="1.8"><rect x="3" y="9" width="14" height="9" rx="2"/><path d="M6 9V6a4 4 0 018 0v3"/></svg>}
          suffix={<span style={{ color: MR.primary, fontWeight: 700, fontSize: 13 }}>MOSTRAR</span>}
        />

        {showError && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            background: MR.dangerBg, color: MR.danger,
            padding: '12px 14px', borderRadius: MR.r.md, marginTop: 4, marginBottom: 12,
            border: `1px solid oklch(0.85 0.080 28)`,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="10" cy="10" r="8.5"/><path d="M10 6v5M10 13.5v.5" strokeLinecap="round"/>
            </svg>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>E-mail ou senha incorretos</div>
              <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2, opacity: 0.85 }}>Verifique seus dados e tente novamente.</div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'right', marginBottom: 22, marginTop: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: MR.primary }}>Esqueci a senha</span>
        </div>

        <BigButton kind="primary">Entrar</BigButton>

        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: MR.ink3, fontWeight: 500 }}>
          Ainda não é cooperado? <span style={{ color: MR.ink2, fontWeight: 700 }}>Fale com sua cooperativa</span>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { LoginScreen });
