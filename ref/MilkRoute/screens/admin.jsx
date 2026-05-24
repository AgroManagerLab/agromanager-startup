// Admin screens — Cooperativa

// ─── Helper: section title ───
function SectionTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px', marginTop: 8, marginBottom: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: MR.ink2, letterSpacing: 0.4, textTransform: 'uppercase' }}>{children}</div>
      {action && <span style={{ fontSize: 13, fontWeight: 700, color: MR.primary }}>{action}</span>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 1. Admin Home (Dashboard) — REQ-01.5
// ══════════════════════════════════════════════════════════════════════════
function AdminHome() {
  return (
    <Phone bg={MR.bg}>
      {/* dark header band */}
      <div style={{ background: MR.primaryDark, color: '#fff', paddingBottom: 22, flexShrink: 0 }}>
        <div style={{ paddingTop: 56, paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <Wordmark size={22} color="#fff" accent={MR.accent} />
            <div style={{
              width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>{Icon.Settings('#fff')}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>{COOP_NAME}</div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.1, marginTop: 4 }}>Olá, Helena</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: MR.accent }} />
            Maio · 14 dias
          </div>
        </div>

        {/* hero metric */}
        <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: 0.5, textTransform: 'uppercase' }}>Volume do mês</div>
          <div style={{ marginTop: 4 }}>
            <Volume value="16.705" size={60} color="#fff" />
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.4 }}>HOJE</div>
              <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 700, marginTop: 2 }}>1.245 L</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.18)' }} />
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.4 }}>PROJEÇÃO</div>
              <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 700, marginTop: 2 }}>R$ 40.927</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.18)' }} />
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.4 }}>PREÇO/L</div>
              <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 700, marginTop: 2 }}>R$ 2,45</div>
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ flex: 1, overflow: 'hidden', paddingTop: 22 }}>
        <SectionTitle action="Ver tudo">Atalhos</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 20px' }}>
          <ShortcutCard color={MR.primarySoft} text={MR.primaryDark} icon={Icon.Plus(MR.primaryDark)} label="Cadastros" hint="Produtor · Rota · Leiteiro" />
          <ShortcutCard color={MR.accentSoft} text="oklch(0.30 0.10 75)" icon={Icon.Users("oklch(0.30 0.10 75)")} label="Produtores" hint="34 ativos" />
        </div>

        <SectionTitle action="Listagem">Equipe em rota agora</SectionTitle>
        <div style={{ padding: '0 20px' }}>
          <Card padding={0}>
            <RouteRow name="Ricardo Pereira" route="Rota Norte" done={4} total={6} status="rota" />
            <Divider />
            <RouteRow name="Ricardo Pereira" route="Rota Sul" done={0} total={5} status="esperando" />
            <Divider />
            <RouteRow name="José Almeida" route="Rota Leste" done={5} total={5} status="concluida" last />
          </Card>
        </div>
      </div>

      <TabBar
        active={0}
        items={[
          { label: 'Início',   icon: Icon.Home(MR.primary) },
          { label: 'Produtores', icon: Icon.Users() },
          { label: 'Cadastros', icon: Icon.Plus() },
          { label: 'Perfil',   icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function ShortcutCard({ color, text, icon, label, hint }) {
  return (
    <div style={{
      background: color, borderRadius: MR.r.lg, padding: 14, height: 108,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: text }}>{icon}</div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 800, color: text, letterSpacing: -0.3 }}>{label}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: text, opacity: 0.75, marginTop: 2 }}>{hint}</div>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: MR.divider, margin: '0 16px' }} />;
}

function RouteRow({ name, route, done, total, status, last }) {
  const stPalettes = {
    rota:       { bg: MR.primarySoft, fg: 'oklch(0.32 0.10 150)', label: 'Em rota' },
    concluida:  { bg: MR.syncBg,      fg: 'oklch(0.30 0.10 150)', label: 'Concluída' },
    esperando:  { bg: MR.surface2,    fg: MR.ink2,                label: 'Aguardando' },
  };
  const s = stPalettes[status];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
      <Avatar name={name} size={42} hue={150} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: MR.ink, letterSpacing: -0.2 }}>{name}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: MR.ink2, marginTop: 2 }}>
          {route} · <span style={{ fontFamily: MR.font.mono, fontWeight: 700 }}>{done}/{total}</span>
        </div>
      </div>
      <span style={{
        padding: '5px 10px', borderRadius: MR.r.pill,
        background: s.bg, color: s.fg, fontSize: 12, fontWeight: 800, letterSpacing: -0.1,
      }}>{s.label}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 1b. Admin Home — VARIATION (timeline-focused)
// ══════════════════════════════════════════════════════════════════════════
function AdminHomeAlt() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader
        back={false}
        title="Visão geral"
        subtitle={`${COOP_NAME} · ${TODAY}`}
        action={<div style={{ width: 44, height: 44, borderRadius: 22, background: MR.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MR.primary }}>{Icon.Settings(MR.primary)}</div>}
      />
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, oklch(0.42 0.085 150) 0%, oklch(0.32 0.085 150) 100%)',
          borderRadius: MR.r.xl, padding: 20, color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: 90, background: 'oklch(0.74 0.140 75 / 0.25)' }} />
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5, textTransform: 'uppercase' }}>Volume do mês · maio</div>
          <div style={{ marginTop: 6 }}>
            <Volume value="16.705" size={48} color="#fff" />
          </div>
          <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.78)' }}>
            Projeção: <span style={{ fontFamily: MR.font.mono, fontWeight: 800, color: '#fff' }}>R$ 40.927,25</span>
          </div>
        </div>

        {/* grid stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
          <Stat label="Produtores" value="34" />
          <Stat label="Rotas" value="3" />
          <Stat label="Leiteiros" value="2" />
        </div>

        {/* rotas hoje */}
        <SectionTitle action="Ver rotas">Hoje · 14 mai</SectionTitle>
        <Card padding={0}>
          <TimelineRow time="06:00" who="Ricardo P." route="Rota Norte" pct={67} status="andamento" />
          <Divider />
          <TimelineRow time="06:00" who="José A." route="Rota Leste" pct={100} status="concluida" />
          <Divider />
          <TimelineRow time="14:00" who="Ricardo P." route="Rota Sul" pct={0} status="programada" last />
        </Card>
      </div>
      <TabBar
        active={0}
        items={[
          { label: 'Início',     icon: Icon.Home(MR.primary) },
          { label: 'Produtores', icon: Icon.Users() },
          { label: 'Cadastros',  icon: Icon.Plus() },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: MR.surface, border: `1px solid ${MR.border}`, borderRadius: MR.r.lg, padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: MR.font.mono, fontSize: 26, fontWeight: 700, color: MR.ink, marginTop: 4, letterSpacing: -1 }}>{value}</div>
    </div>
  );
}

function TimelineRow({ time, who, route, pct, status, last }) {
  const palette = {
    andamento:   { bar: MR.primary,    chip: { bg: MR.primarySoft, fg: 'oklch(0.32 0.10 150)' }, label: 'Em andamento' },
    concluida:   { bar: MR.syncOk,     chip: { bg: MR.syncBg, fg: 'oklch(0.30 0.10 150)' }, label: 'Concluída' },
    programada:  { bar: MR.border,     chip: { bg: MR.surface2, fg: MR.ink2 }, label: 'Programada' },
  }[status];
  return (
    <div style={{ display: 'flex', gap: 12, padding: '14px 16px', alignItems: 'flex-start' }}>
      <div style={{ fontFamily: MR.font.mono, fontSize: 13, fontWeight: 700, color: MR.ink2, paddingTop: 2, width: 42 }}>{time}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15.5, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>{route}</div>
          <span style={{
            padding: '3px 8px', borderRadius: MR.r.pill,
            background: palette.chip.bg, color: palette.chip.fg, fontSize: 11.5, fontWeight: 800, letterSpacing: -0.1,
          }}>{palette.label}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: MR.ink2, marginTop: 2 }}>{who}</div>
        <div style={{ marginTop: 10, height: 6, background: MR.surface2, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: palette.bar, borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 2. Cadastros Hub
// ══════════════════════════════════════════════════════════════════════════
function AdminCadastrosHub() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Cadastros" subtitle="O que você quer cadastrar?" />
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <CadastroCard
          icon={Icon.Users(MR.primaryDark)}
          color={MR.primarySoft}
          text={MR.primaryDark}
          title="Produtor"
          subtitle="Nome, fazenda, rota, senha inicial"
          count="34 cadastrados"
        />
        <CadastroCard
          icon={Icon.Route('oklch(0.30 0.10 75)')}
          color={MR.accentSoft}
          text="oklch(0.30 0.10 75)"
          title="Rota"
          subtitle="Sequência de coleta e produtores"
          count="3 ativas"
        />
        <CadastroCard
          icon={Icon.Truck('oklch(0.30 0.06 240)')}
          color="oklch(0.95 0.020 240)"
          text="oklch(0.30 0.06 240)"
          title="Leiteiro"
          subtitle="E-mail, senha e rotas vinculadas"
          count="2 cadastrados"
        />
      </div>
      <TabBar
        active={2}
        items={[
          { label: 'Início',     icon: Icon.Home() },
          { label: 'Produtores', icon: Icon.Users() },
          { label: 'Cadastros',  icon: Icon.Plus(MR.primary) },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function CadastroCard({ icon, color, text, title, subtitle, count }) {
  return (
    <div style={{
      background: MR.surface, border: `1px solid ${MR.border}`, borderRadius: MR.r.xl,
      padding: 18, display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: MR.ink, letterSpacing: -0.4 }}>{title}</div>
        <div style={{ fontSize: 13.5, color: MR.ink2, fontWeight: 600, marginTop: 2 }}>{subtitle}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: text, marginTop: 6, fontFamily: MR.font.mono }}>{count}</div>
      </div>
      <div style={{ color: MR.ink3 }}>{Icon.Chevron(MR.ink3)}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 3. Cadastro de Produtor (REQ-02.1–02.4)
// ══════════════════════════════════════════════════════════════════════════
function AdminCadastroProdutor() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Novo produtor" subtitle="Dados cadastrais e acesso" />
      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 20px 20px' }}>
        <Field label="Nome completo" value="Antônio Rocha" focused />
        <Field label="Identificador da fazenda" value="Faz. Boa Vista" />
        <Field
          label="Rota associada"
          value="Rota Sul"
          icon={<div style={{ width: 22, height: 22, borderRadius: 11, background: MR.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MR.primaryDark }}>{Icon.Route(MR.primaryDark)}</div>}
          suffix={<span style={{ color: MR.ink3 }}>{Icon.Chevron(MR.ink3)}</span>}
        />
        <Field
          label="Senha inicial"
          value="••••••••"
          hint="O produtor poderá alterar no primeiro acesso."
          suffix={<span style={{ color: MR.primary, fontWeight: 700, fontSize: 13 }}>GERAR</span>}
        />
      </div>
      <div style={{ flexShrink: 0, padding: '8px 20px 20px', borderTop: `1px solid ${MR.border}`, background: MR.surface, display: 'flex', gap: 10 }}>
        <BigButton kind="secondary" full={false} style={{ flex: 1 }}>Cancelar</BigButton>
        <BigButton kind="primary" full={false} style={{ flex: 1.6 }} icon={Icon.Check('#fff')}>Cadastrar</BigButton>
      </div>
    </Phone>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 4. Cadastro de Rota (REQ-02.5–02.7)
// ══════════════════════════════════════════════════════════════════════════
function AdminCadastroRota() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Nova rota" subtitle="Sequência de coleta" />
      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 20px 20px' }}>
        <Field label="Nome da rota" value="Rota Norte" focused />
        <Field
          label="Identificador"
          value="N-01"
          suffix={<span style={{ color: MR.ink3, fontFamily: MR.font.mono, fontSize: 12 }}>4 caracteres</span>}
        />

        <div style={{ fontSize: 14, fontWeight: 700, color: MR.ink2, marginTop: 6, marginBottom: 8, letterSpacing: -0.1 }}>
          Produtores nesta rota <span style={{ color: MR.ink3, fontWeight: 600 }}>· 3 selecionados</span>
        </div>

        <Card padding={0}>
          <ProdutorMini name="João Carvalho"  farm="Faz. Santa Luzia"  checked hue={150} order={1} />
          <Divider />
          <ProdutorMini name="Maria Oliveira" farm="Faz. Boa Esperança" checked hue={75} order={2} />
          <Divider />
          <ProdutorMini name="Beatriz Lima"   farm="Faz. Aurora"        checked hue={280} order={3} />
          <Divider />
          <ProdutorMini name="Pedro Santos"   farm="Sítio do Vale"      hue={200} />
        </Card>

        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 16px', borderRadius: MR.r.md, border: `1.5px dashed ${MR.border}`, color: MR.primary, fontWeight: 700, fontSize: 14.5 }}>
          {Icon.Plus(MR.primary)} <span>Adicionar produtor</span>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '8px 20px 20px', borderTop: `1px solid ${MR.border}`, background: MR.surface, display: 'flex', gap: 10 }}>
        <BigButton kind="secondary" full={false} style={{ flex: 1 }}>Cancelar</BigButton>
        <BigButton kind="primary" full={false} style={{ flex: 1.6 }} icon={Icon.Check('#fff')}>Salvar rota</BigButton>
      </div>
    </Phone>
  );
}

function ProdutorMini({ name, farm, checked, hue, order }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
      <div style={{
        width: 24, height: 24, borderRadius: 6,
        background: checked ? MR.primary : 'transparent',
        border: checked ? 'none' : `1.5px solid ${MR.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0,
      }}>{checked && Icon.Check('#fff')}</div>
      <Avatar name={name} size={38} hue={hue} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: MR.ink, letterSpacing: -0.2 }}>{name}</div>
        <div style={{ fontSize: 13, color: MR.ink2, fontWeight: 600 }}>{farm}</div>
      </div>
      {order !== undefined && (
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: MR.surface2,
          fontFamily: MR.font.mono, fontSize: 13, fontWeight: 800, color: MR.ink2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{order}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 5. Cadastro de Leiteiro (REQ-02.8–02.10)
// ══════════════════════════════════════════════════════════════════════════
function AdminCadastroLeiteiro() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Novo leiteiro" subtitle="Dados de acesso e rotas" />
      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 20px 20px' }}>
        <Field label="Nome completo" value="Ricardo Pereira" focused />
        <Field
          label="E-mail (usado para login)"
          value="ricardo@coopvaleleite.coop.br"
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={MR.ink3} strokeWidth="1.8"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>}
        />
        <Field label="Senha inicial" value="••••••••" suffix={<span style={{ color: MR.primary, fontWeight: 700, fontSize: 13 }}>GERAR</span>} />

        <div style={{ fontSize: 14, fontWeight: 700, color: MR.ink2, marginTop: 6, marginBottom: 8 }}>
          Rotas vinculadas <span style={{ color: MR.ink3, fontWeight: 600 }}>· 2 selecionadas</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <RouteChip checked label="Rota Norte" />
          <RouteChip checked label="Rota Sul" />
          <RouteChip label="Rota Leste" />
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '8px 20px 20px', borderTop: `1px solid ${MR.border}`, background: MR.surface, display: 'flex', gap: 10 }}>
        <BigButton kind="secondary" full={false} style={{ flex: 1 }}>Cancelar</BigButton>
        <BigButton kind="primary" full={false} style={{ flex: 1.6 }} icon={Icon.Check('#fff')}>Cadastrar</BigButton>
      </div>
    </Phone>
  );
}

function RouteChip({ label, checked }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, height: 44,
      padding: '0 14px', borderRadius: MR.r.pill,
      background: checked ? MR.primary : MR.surface,
      color: checked ? '#fff' : MR.ink,
      border: checked ? 'none' : `1.5px solid ${MR.border}`,
      fontWeight: 700, fontSize: 14.5,
    }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: checked ? '#fff' : 'transparent', border: checked ? 'none' : `1.5px solid ${MR.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked && <div style={{ width: 8, height: 8, borderRadius: 4, background: MR.primary }} />}
      </div>
      {label}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 6. Listagem de Produtores (Admin) — REQ-02.11–02.14
// ══════════════════════════════════════════════════════════════════════════
function AdminListagemProdutores() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader
        title="Produtores"
        subtitle="34 ativos · todas as rotas"
        action={<div style={{ width: 44, height: 44, borderRadius: 14, background: MR.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{Icon.Plus('#fff')}</div>}
      />
      <div style={{ flexShrink: 0, padding: '4px 20px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: MR.surface, borderRadius: MR.r.md, height: 52,
          padding: '0 14px', border: `1px solid ${MR.border}`,
        }}>
          {Icon.Search(MR.ink3)}
          <div style={{ flex: 1, fontSize: 15.5, color: MR.ink3, fontWeight: 500 }}>Buscar por nome ou fazenda</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
          <FilterPill active>Todas rotas</FilterPill>
          <FilterPill>Rota Norte</FilterPill>
          <FilterPill>Rota Sul</FilterPill>
          <FilterPill>Rota Leste</FilterPill>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        <Card padding={0}>
          {PRODUCERS.slice(0, 6).map((p, i) => (
            <React.Fragment key={p.id}>
              {i > 0 && <Divider />}
              <ProdutorListItem p={p} />
            </React.Fragment>
          ))}
        </Card>
      </div>
      <TabBar
        active={1}
        items={[
          { label: 'Início',     icon: Icon.Home() },
          { label: 'Produtores', icon: Icon.Users(MR.primary) },
          { label: 'Cadastros',  icon: Icon.Plus() },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function FilterPill({ children, active }) {
  return (
    <div style={{
      flexShrink: 0, padding: '8px 14px', borderRadius: MR.r.pill,
      background: active ? MR.ink : MR.surface,
      color: active ? '#fff' : MR.ink,
      border: active ? 'none' : `1px solid ${MR.border}`,
      fontWeight: 700, fontSize: 13.5, letterSpacing: -0.1,
    }}>{children}</div>
  );
}

function ProdutorListItem({ p }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
      <Avatar name={p.name} size={44} hue={p.hue} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: MR.ink, letterSpacing: -0.3 }}>{p.name}</div>
        <div style={{ fontSize: 13, color: MR.ink2, fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{p.farm}</span>
          <span style={{ width: 3, height: 3, borderRadius: 1.5, background: MR.ink3 }} />
          <span>{p.route}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: MR.font.mono, fontSize: 15, fontWeight: 700, color: MR.ink }}>{p.monthL.toLocaleString('pt-BR')} L</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: MR.ink3, marginTop: 2, letterSpacing: 0.3, textTransform: 'uppercase' }}>mai</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 7. Detalhamento de Produtor (Admin) — REQ-02.15–02.18, REQ-03.15, REQ-04.5
// ══════════════════════════════════════════════════════════════════════════
function AdminDetalhamentoProdutor() {
  const p = PRODUCERS[1]; // Maria
  const projection = p.monthL * PRICE_PER_LITER;
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader
        title={p.name}
        subtitle={`${p.farm} · ${p.route}`}
        action={<div style={{ width: 44, height: 44, borderRadius: 14, background: MR.surface, border: `1px solid ${MR.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MR.ink2 }}>{Icon.Edit(MR.ink2)}</div>}
      />
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        {/* metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
          <Card padding={14}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>Volume · maio</div>
            <div style={{ marginTop: 4 }}>
              <Volume value={p.monthL.toLocaleString('pt-BR')} size={32} />
            </div>
            <div style={{ fontSize: 12, color: MR.ink2, fontWeight: 600, marginTop: 6 }}>
              18 coletas sincronizadas
            </div>
          </Card>
          <Card padding={14} style={{ background: MR.primaryDark, borderColor: MR.primaryDark, color: '#fff' }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Projeção *</div>
            <div style={{ marginTop: 4 }}>
              <MoneyBRL value={projection} size={26} color="#fff" />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginTop: 6, fontFamily: MR.font.mono }}>
              × R$ 2,45/L
            </div>
          </Card>
        </div>
        <div style={{ fontSize: 11.5, color: MR.ink3, fontWeight: 600, marginTop: 6, paddingLeft: 2 }}>
          * Valor estimado, não é o pagamento final.
        </div>

        {/* Hist title */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 18, marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>Histórico de coletas</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: MR.ink3, fontFamily: MR.font.mono }}>maio · 5 mais recentes</span>
        </div>
        <Card padding={0}>
          {PRODUTOR_HISTORY_ADMIN.map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Divider />}
              <ColetaRowAdmin row={h} />
            </React.Fragment>
          ))}
        </Card>
      </div>
      <div style={{ flexShrink: 0, padding: 18 }}>
        <BigButton kind="secondary" icon={Icon.History(MR.ink)}>Ver todas as coletas</BigButton>
      </div>
    </Phone>
  );
}

function ColetaRowAdmin({ row }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
      <PhotoStripe caption="" width={52} height={52} rounded={10} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: MR.ink }}>{row.date}<span style={{ color: MR.ink3, fontWeight: 600, marginLeft: 6, fontFamily: MR.font.mono, fontSize: 12 }}>{row.time}</span></div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: MR.ink2, marginTop: 2 }}>{row.leiteiro}</div>
      </div>
      <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 700, color: MR.ink }}>{row.volume} <span style={{ fontSize: 12, color: MR.ink2 }}>L</span></div>
    </div>
  );
}

Object.assign(window, {
  AdminHome, AdminHomeAlt, AdminCadastrosHub,
  AdminCadastroProdutor, AdminCadastroRota, AdminCadastroLeiteiro,
  AdminListagemProdutores, AdminDetalhamentoProdutor,
});
