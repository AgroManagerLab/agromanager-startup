// Leiteiro screens — Motorista

// ══════════════════════════════════════════════════════════════════════════
// L1. Leiteiro Home — today's progress on the route
// ══════════════════════════════════════════════════════════════════════════
function LeiteiroHome() {
  return (
    <Phone bg={MR.bg}>
      {/* hero band */}
      <div style={{
        background: 'linear-gradient(180deg, oklch(0.42 0.085 150) 0%, oklch(0.36 0.085 150) 100%)',
        color: '#fff', paddingBottom: 24, flexShrink: 0,
      }}>
        <div style={{ paddingTop: 56, paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <Wordmark size={20} color="#fff" accent={MR.accent} />
            <div style={{
              padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.16)',
              fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: MR.accent }} />
              {TODAY}
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Olá, Ricardo</div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.1, marginTop: 2 }}>Rota Norte</div>

          {/* progress card */}
          <div style={{
            marginTop: 18, background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.18)', borderRadius: MR.r.lg, padding: 16,
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Progresso de hoje</span>
              <span style={{ fontFamily: MR.font.mono, fontSize: 14, fontWeight: 800 }}>4 / 6</span>
            </div>
            <div style={{ marginTop: 8, height: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '67%', height: '100%', background: MR.accent, borderRadius: 4 }} />
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between' }}>
              <Mini label="Coletado" value="565 L" />
              <Mini label="Pendentes" value="2" warn />
              <Mini label="Sincr." value="2 / 4" />
            </div>
          </div>
        </div>
      </div>

      {/* primary action */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '18px 20px 8px' }}>
        <BigButton kind="accent" icon={Icon.Plus('#1c1408')}>Registrar coleta</BigButton>

        <div style={{ marginTop: 18, fontSize: 13, fontWeight: 800, color: MR.ink2, letterSpacing: 0.4, textTransform: 'uppercase' }}>Próximas paradas</div>
        <div style={{ marginTop: 10 }}>
          <Card padding={0}>
            <NextStop seq={5} name="Beatriz Lima"   farm="Faz. Aurora"    distance="3,2 km" />
            <Divider />
            <NextStop seq={6} name="Antônio Rocha"  farm="Faz. Boa Vista" distance="6,8 km" last />
          </Card>
        </div>
      </div>

      <TabBar
        active={0}
        items={[
          { label: 'Hoje',       icon: Icon.Home(MR.primary) },
          { label: 'Produtores', icon: Icon.Users() },
          { label: 'Histórico',  icon: Icon.History() },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function Mini({ label, value, warn }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 800, marginTop: 2, color: warn ? MR.accent : '#fff' }}>{value}</div>
    </div>
  );
}

function NextStop({ seq, name, farm, distance, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
      <div style={{
        width: 40, height: 40, borderRadius: 14,
        background: MR.primarySoft, color: MR.primaryDark,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: MR.font.mono, fontSize: 16, fontWeight: 800,
      }}>{seq}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>{name}</div>
        <div style={{ fontSize: 13, color: MR.ink2, fontWeight: 600, marginTop: 2 }}>{farm}</div>
      </div>
      <div style={{ fontFamily: MR.font.mono, fontSize: 13, fontWeight: 700, color: MR.ink2 }}>{distance}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// L2. Listagem produtores (visão leiteiro) — REQ-02.11–02.14
//  - Only producers of his route(s)
//  - Status per producer (collected today / pending)
// ══════════════════════════════════════════════════════════════════════════
function LeiteiroListagemProdutores() {
  const norteOnly = PRODUCERS.filter(p => p.route === 'Rota Norte');
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader
        title="Minha rota"
        subtitle="Rota Norte · 6 produtores"
      />
      <OfflineBanner />
      <div style={{ flexShrink: 0, padding: '12px 20px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: MR.surface, borderRadius: MR.r.md, height: 52,
          padding: '0 14px', border: `1px solid ${MR.border}`,
        }}>
          {Icon.Search(MR.ink3)}
          <div style={{ flex: 1, fontSize: 15.5, color: MR.ink3, fontWeight: 500 }}>Buscar produtor</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        <Card padding={0}>
          <LeiteiroProdRow seq={1} p={norteOnly[0]} state="synced" volume={142} />
          <Divider />
          <LeiteiroProdRow seq={2} p={norteOnly[1]} state="synced" volume={168} />
          <Divider />
          <LeiteiroProdRow seq={3} p={norteOnly[2]} state="pending" volume={134} />
          <Divider />
          <LeiteiroProdRow seq={4} p={PRODUCERS[6]} state="pending" volume={121} />
          <Divider />
          <LeiteiroProdRow seq={5} p={{ name: 'Marcos Vilas', farm: 'Sítio Vila Nova', hue: 30 }} state="next" />
          <Divider />
          <LeiteiroProdRow seq={6} p={{ name: 'Sandra Diniz', farm: 'Faz. Boa Sorte', hue: 200 }} state="next" />
        </Card>
      </div>
      <TabBar
        active={1}
        items={[
          { label: 'Hoje',       icon: Icon.Home() },
          { label: 'Produtores', icon: Icon.Users(MR.primary) },
          { label: 'Histórico',  icon: Icon.History() },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function LeiteiroProdRow({ seq, p, state, volume }) {
  const states = {
    synced:  { chip: <SyncBadge state="synced" />,  volColor: MR.ink },
    pending: { chip: <SyncBadge state="pending" />, volColor: 'oklch(0.45 0.140 60)' },
    next:    { chip: <span style={{ fontSize: 12, fontWeight: 700, color: MR.ink3, fontFamily: MR.font.mono, textTransform: 'uppercase', letterSpacing: 0.4 }}>Próximo</span>, volColor: MR.ink3 },
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: MR.surface2, color: MR.ink2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: MR.font.mono, fontSize: 13, fontWeight: 800, flexShrink: 0,
      }}>{seq}</div>
      <Avatar name={p.name} size={42} hue={p.hue} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>{p.name}</div>
        <div style={{ marginTop: 4 }}>{states[state].chip}</div>
      </div>
      {volume !== undefined && (
        <div style={{ fontFamily: MR.font.mono, fontSize: 17, fontWeight: 800, color: states[state].volColor }}>
          {volume} <span style={{ fontSize: 12, color: MR.ink2 }}>L</span>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// L3. Registro de Coleta — REQ-03.1–03.6, REQ-03.7, REQ-03.8
//   Three variations:
//   (a) Vertical default — camera big, volume number pad below
//   (b) Camera-first — full-bleed camera viewfinder
//   (c) Two-step wizard — step 1 volume, step 2 photo (current shown: step 1)
// ══════════════════════════════════════════════════════════════════════════
function RegistroColetaDefault() {
  const p = PRODUCERS[5]; // Beatriz
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader
        title="Registrar coleta"
        subtitle="Confirme volume e foto da régua"
        action={<span style={{
          padding: '6px 10px', borderRadius: 999, background: MR.surface, border: `1px solid ${MR.border}`,
          color: MR.ink2, fontSize: 12, fontWeight: 800, fontFamily: MR.font.mono,
        }}>3/6</span>}
      />
      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 20px 20px' }}>
        {/* producer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: MR.surface, border: `1px solid ${MR.border}`,
          borderRadius: MR.r.lg, padding: '14px 16px',
        }}>
          <Avatar name={p.name} size={48} hue={p.hue} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>Produtor</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: MR.ink, letterSpacing: -0.3, marginTop: 2 }}>{p.name}</div>
            <div style={{ fontSize: 13, color: MR.ink2, fontWeight: 600 }}>{p.farm}</div>
          </div>
          <span style={{ color: MR.primary, fontWeight: 700, fontSize: 13.5 }}>Trocar</span>
        </div>

        {/* volume */}
        <div style={{ marginTop: 16 }}>
          <Field label="Volume coletado" value="134" suffix="L" big focused type="number" />
        </div>

        {/* photo */}
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: MR.ink2, marginBottom: 6, letterSpacing: -0.1, display: 'flex', alignItems: 'center', gap: 6 }}>
            Foto da régua
            <span style={{ color: MR.danger, fontSize: 13 }}>* obrigatória</span>
          </div>
          <div style={{
            background: MR.surface, borderRadius: MR.r.md,
            border: `1.5px dashed ${MR.border}`, padding: 14,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 14,
              background: MR.primary, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>{Icon.Camera('#fff')}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>Abrir câmera</div>
              <div style={{ fontSize: 13, color: MR.ink2, fontWeight: 600, marginTop: 2 }}>Necessária para confirmar o registro</div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 16, background: MR.pendingBg,
          borderRadius: MR.r.md, padding: '12px 14px',
          display: 'flex', alignItems: 'flex-start', gap: 10,
          color: 'oklch(0.36 0.130 60)',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7.5"/><path d="M9 5v5M9 12v.5" strokeLinecap="round"/></svg>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
            Sem conexão. A coleta ficará <strong>pendente</strong> e sincroniza automaticamente quando voltar o sinal.
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '8px 20px 20px', borderTop: `1px solid ${MR.border}`, background: MR.surface }}>
        <BigButton kind="primary" icon={Icon.Check('#fff')}>Confirmar coleta</BigButton>
      </div>
    </Phone>
  );
}

// (b) — Camera-first
function RegistroColetaCameraFirst() {
  const p = PRODUCERS[5];
  return (
    <Phone bg="#0a0908" dark statusBarDark>
      {/* simulated viewfinder */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(120% 80% at 50% 30%, oklch(0.18 0.04 240) 0%, #0a0908 70%)',
      }}>
        {/* ruler placeholder */}
        <div style={{
          position: 'absolute', left: '14%', top: '14%', bottom: '20%', width: '38%',
          background: 'repeating-linear-gradient(180deg, oklch(0.34 0.03 240) 0 14px, oklch(0.26 0.03 240) 14px 16px)',
          borderRadius: 10, border: '1.5px solid oklch(0.42 0.05 240)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }} />
        {/* corner brackets — outline the photo target area */}
        {[
          { top: 110, left: 30,  borderTop: '3px solid #fff', borderLeft:  '3px solid #fff' },
          { top: 110, right: 30, borderTop: '3px solid #fff', borderRight: '3px solid #fff' },
          { bottom: 240, left: 30,  borderBottom: '3px solid #fff', borderLeft:  '3px solid #fff' },
          { bottom: 240, right: 30, borderBottom: '3px solid #fff', borderRight: '3px solid #fff' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 28, height: 28, ...s }} />
        ))}

        {/* top hud */}
        <div style={{
          position: 'absolute', top: 60, left: 16, right: 16,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <button style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M6 10l-3-3 3-3M3 7h10a4 4 0 014 4v0a4 4 0 01-4 4H8"/></svg>
          </button>
          <div style={{
            flex: 1, background: 'rgba(0,0,0,0.45)', borderRadius: 22, padding: '8px 14px', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Avatar name={p.name} size={28} hue={p.hue} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: -0.2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p.farm}</div>
            </div>
          </div>
        </div>

        {/* instruction */}
        <div style={{
          position: 'absolute', top: '46%', left: 0, right: 0, textAlign: 'center', color: '#fff',
          fontSize: 14, fontWeight: 700, letterSpacing: -0.2, textShadow: '0 1px 8px rgba(0,0,0,0.7)',
        }}>Enquadre a régua dentro das marcas</div>

        {/* volume + shutter */}
        <div style={{
          position: 'absolute', bottom: 60, left: 16, right: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
        }}>
          <div style={{
            background: 'rgba(0,0,0,0.55)', borderRadius: MR.r.lg, padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 14, color: '#fff', minWidth: 220,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Volume</div>
              <div style={{ fontFamily: MR.font.mono, fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -1, marginTop: 2 }}>134 <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>L</span></div>
            </div>
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ color: MR.accent, fontWeight: 800, fontSize: 13 }}>EDITAR</span>
          </div>

          {/* shutter */}
          <button style={{
            width: 92, height: 92, borderRadius: 46,
            background: 'rgba(255,255,255,0.15)', border: '4px solid rgba(255,255,255,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer',
          }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: '#fff' }} />
          </button>
        </div>
      </div>
    </Phone>
  );
}

// (c) — Two-step wizard: step 1 (volume confirmed → next: photo)
function RegistroColetaWizard() {
  const p = PRODUCERS[5];
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Coleta" subtitle="Etapa 1 de 2 · Volume" />
      <div style={{ flexShrink: 0, padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: MR.primary }} />
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: MR.border }} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <Avatar name={p.name} size={48} hue={p.hue} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: MR.ink }}>{p.name}</div>
            <div style={{ fontSize: 13, color: MR.ink2, fontWeight: 600 }}>{p.farm}</div>
          </div>
        </div>

        {/* HUGE volume display */}
        <div style={{
          background: MR.surface, border: `2px solid ${MR.primary}`, borderRadius: MR.r.xl,
          padding: '28px 20px', textAlign: 'center', boxShadow: `0 0 0 6px oklch(0.42 0.085 150 / 0.10)`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>Volume coletado</div>
          <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: MR.font.mono, fontSize: 88, fontWeight: 800, color: MR.ink, letterSpacing: -4, lineHeight: 1 }}>134</span>
            <span style={{ fontSize: 30, fontWeight: 700, color: MR.ink2 }}>L</span>
          </div>
        </div>

        {/* number pad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 18 }}>
          {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map((k, i) => (
            <button key={i} style={{
              height: 56, borderRadius: MR.r.md, border: `1px solid ${MR.border}`,
              background: MR.surface, fontFamily: MR.font.mono, fontSize: 22, fontWeight: 700,
              color: MR.ink, cursor: 'pointer',
            }}>{k}</button>
          ))}
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '8px 20px 20px', borderTop: `1px solid ${MR.border}`, background: MR.surface, display: 'flex', gap: 10 }}>
        <BigButton kind="secondary" full={false} style={{ flex: 1 }}>Voltar</BigButton>
        <BigButton kind="primary" full={false} style={{ flex: 1.6 }} icon={Icon.Camera('#fff')}>Tirar foto</BigButton>
      </div>
    </Phone>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// L4. Histórico do leiteiro — REQ-03.8, REQ-03.11
// ══════════════════════════════════════════════════════════════════════════
function LeiteiroHistorico() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Histórico" subtitle="Suas coletas · todas as rotas" />
      <OfflineBanner />
      <div style={{ flexShrink: 0, padding: '12px 20px 14px', display: 'flex', gap: 8 }}>
        <FilterPill active>Todas</FilterPill>
        <FilterPill>Pendentes <span style={{ marginLeft: 4, fontFamily: MR.font.mono }}>2</span></FilterPill>
        <FilterPill>Sincronizadas</FilterPill>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: MR.ink2, letterSpacing: 0.4, textTransform: 'uppercase', margin: '6px 4px 8px' }}>Hoje · 14 mai</div>
        <Card padding={0}>
          <ColetaRowLeiteiro row={COLLECTIONS_LEITEIRO_TODAY[3]} />
          <Divider />
          <ColetaRowLeiteiro row={COLLECTIONS_LEITEIRO_TODAY[2]} />
          <Divider />
          <ColetaRowLeiteiro row={COLLECTIONS_LEITEIRO_TODAY[1]} />
          <Divider />
          <ColetaRowLeiteiro row={COLLECTIONS_LEITEIRO_TODAY[0]} />
        </Card>

        <div style={{ fontSize: 12.5, fontWeight: 800, color: MR.ink2, letterSpacing: 0.4, textTransform: 'uppercase', margin: '14px 4px 8px' }}>Ontem · 13 mai</div>
        <Card padding={0}>
          <ColetaRowLeiteiro row={{ producer: 'João Carvalho',  farm: 'Faz. Santa Luzia', volume: 138, time: '06:14', status: 'synced' }} />
          <Divider />
          <ColetaRowLeiteiro row={{ producer: 'Maria Oliveira', farm: 'Faz. Boa Esperança', volume: 154, time: '06:42', status: 'synced' }} />
        </Card>
      </div>
      <TabBar
        active={2}
        items={[
          { label: 'Hoje',       icon: Icon.Home() },
          { label: 'Produtores', icon: Icon.Users() },
          { label: 'Histórico',  icon: Icon.History(MR.primary) },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function ColetaRowLeiteiro({ row }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
      <PhotoStripe caption="" width={48} height={48} rounded={10} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>{row.producer}</div>
        <div style={{ fontSize: 12.5, color: MR.ink2, fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: MR.font.mono, fontWeight: 700 }}>{row.time}</span>
          <span style={{ width: 3, height: 3, borderRadius: 1.5, background: MR.ink3 }} />
          <SyncBadge state={row.status} />
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 800, color: MR.ink }}>{row.volume} <span style={{ fontSize: 12, color: MR.ink2 }}>L</span></div>
      </div>
      <div style={{ color: MR.ink3, marginLeft: 4 }}>{Icon.Chevron(MR.ink3)}</div>
    </div>
  );
}

Object.assign(window, {
  LeiteiroHome, LeiteiroListagemProdutores,
  RegistroColetaDefault, RegistroColetaCameraFirst, RegistroColetaWizard,
  LeiteiroHistorico,
});
