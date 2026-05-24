// Produtor screens

// ══════════════════════════════════════════════════════════════════════════
// PR1. Produtor Home — Volume + Projeção (REQ-04.4, REQ-04.7, REQ-03.17)
// ══════════════════════════════════════════════════════════════════════════
function ProdutorHome() {
  const monthL = 1380;
  const projection = monthL * PRICE_PER_LITER;
  return (
    <Phone bg={MR.bg}>
      <div style={{ background: MR.primaryDark, color: '#fff', flexShrink: 0, paddingBottom: 24 }}>
        <div style={{ paddingTop: 56, paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <Wordmark size={20} color="#fff" accent={MR.accent} />
            <div style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.Settings('#fff')}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>Boa tarde, João</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, marginTop: 2 }}>Faz. Santa Luzia</div>

          <div style={{
            marginTop: 24,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Volume do mês · maio
            </div>
            <Volume value={monthL.toLocaleString('pt-BR')} size={64} color="#fff" />
          </div>

          {/* projection card — accent strip */}
          <div style={{
            marginTop: 20, background: MR.accent, color: 'oklch(0.22 0.08 75)',
            borderRadius: MR.r.lg, padding: 16, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon.Wallet('oklch(0.22 0.08 75)')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.4, textTransform: 'uppercase', opacity: 0.7 }}>Projeção · maio</div>
                <div style={{ marginTop: 2 }}>
                  <MoneyBRL value={projection} size={32} color="oklch(0.22 0.08 75)" />
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, fontFamily: MR.font.mono, opacity: 0.7 }}>
                  {monthL.toLocaleString('pt-BR')} L × R$ 2,45/L
                </div>
              </div>
            </div>
            <div style={{
              marginTop: 12, padding: '8px 10px', background: 'rgba(255,255,255,0.4)',
              borderRadius: MR.r.sm, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'flex-start', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="6"/><path d="M7 4v3.5M7 9v.5" strokeLinecap="round"/></svg>
              <span>Valor estimado. Não é o pagamento final do mês.</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '20px 20px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>Últimas coletas</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MR.primary }}>Ver tudo</span>
        </div>
        <Card padding={0}>
          {PRODUTOR_HISTORY.slice(0, 3).map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Divider />}
              <ColetaRowProdutor row={h} />
            </React.Fragment>
          ))}
        </Card>
      </div>

      <TabBar
        active={0}
        items={[
          { label: 'Início',     icon: Icon.Home(MR.primary) },
          { label: 'Histórico',  icon: Icon.History() },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PR1b. VARIATION — Produtor Home (calm light, sem hero escuro)
// ══════════════════════════════════════════════════════════════════════════
function ProdutorHomeAlt() {
  const monthL = 1380;
  const projection = monthL * PRICE_PER_LITER;
  const litersPerDay = [110, 138, 145, 132, 141, 150, 128, 144, 139, 0, 138, 145, 132, 138];
  const maxV = Math.max(...litersPerDay);
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader
        back={false}
        title="Olá, João"
        subtitle="Faz. Santa Luzia · Rota Norte"
        action={<div style={{ width: 44, height: 44, borderRadius: 22, background: MR.surface, border: `1px solid ${MR.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.Settings(MR.ink2)}</div>}
      />
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        {/* big metric */}
        <Card padding={20} style={{ background: MR.primarySofter, borderColor: 'oklch(0.85 0.040 150)' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'oklch(0.32 0.10 150)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Volume · maio</div>
          <div style={{ marginTop: 6 }}>
            <Volume value={monthL.toLocaleString('pt-BR')} size={56} color={MR.primaryDark} />
          </div>

          {/* bars */}
          <div style={{ marginTop: 14, display: 'flex', gap: 3, alignItems: 'flex-end', height: 56 }}>
            {litersPerDay.map((v, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${Math.max(8, (v / maxV) * 100)}%`,
                background: v === 0 ? 'oklch(0.85 0.030 150)' : (i === litersPerDay.length - 1 ? MR.accent : MR.primary),
                borderRadius: 3,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, fontFamily: MR.font.mono, color: MR.ink3, fontWeight: 700 }}>
            <span>01</span><span>07</span><span>14</span>
          </div>
        </Card>

        {/* projection */}
        <div style={{ marginTop: 12 }}>
          <Card padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: MR.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.Wallet('oklch(0.40 0.10 75)')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>Projeção · maio*</div>
                <MoneyBRL value={projection} size={28} />
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${MR.border}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: MR.ink2, fontFamily: MR.font.mono }}>
              <span>{monthL.toLocaleString('pt-BR')} L</span>
              <span>×</span>
              <span>R$ 2,45 / L</span>
              <span>=</span>
              <span style={{ color: MR.ink }}>R$ {projection.toFixed(2).replace('.', ',')}</span>
            </div>
            <div style={{ fontSize: 11.5, color: MR.ink3, fontWeight: 600, marginTop: 8 }}>
              * Valor estimado, não é o pagamento final.
            </div>
          </Card>
        </div>

        {/* recent */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '18px 4px 10px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>Últimas 3 coletas</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MR.primary }}>Ver tudo</span>
        </div>
        <Card padding={0}>
          {PRODUTOR_HISTORY.slice(0, 3).map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Divider />}
              <ColetaRowProdutor row={h} />
            </React.Fragment>
          ))}
        </Card>
      </div>
      <TabBar
        active={0}
        items={[
          { label: 'Início',     icon: Icon.Home(MR.primary) },
          { label: 'Histórico',  icon: Icon.History() },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function ColetaRowProdutor({ row }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
      <PhotoStripe caption="" width={44} height={44} rounded={10} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: MR.ink }}>{row.date}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: MR.ink2, marginTop: 2, fontFamily: MR.font.mono }}>{row.time}</div>
      </div>
      <div style={{ fontFamily: MR.font.mono, fontSize: 18, fontWeight: 800, color: MR.ink }}>{row.volume} <span style={{ fontSize: 12, color: MR.ink2 }}>L</span></div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PR2. Produtor Histórico — REQ-03.16
// ══════════════════════════════════════════════════════════════════════════
function ProdutorHistorico() {
  return (
    <Phone bg={MR.bg}>
      <ScreenHeader title="Minhas coletas" subtitle="Maio · 8 sincronizadas" />
      <div style={{ flexShrink: 0, padding: '0 20px 14px' }}>
        <Card padding={14}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>Total do mês</div>
              <Volume value="1.380" size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: MR.ink3, letterSpacing: 0.4, textTransform: 'uppercase' }}>Média / dia</div>
              <div style={{ fontFamily: MR.font.mono, fontSize: 22, fontWeight: 700, color: MR.ink, marginTop: 2 }}>138,2 <span style={{ fontSize: 12, color: MR.ink2 }}>L</span></div>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
        <Card padding={0}>
          {PRODUTOR_HISTORY.map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Divider />}
              <ColetaRowProdutorBig row={h} />
            </React.Fragment>
          ))}
        </Card>
      </div>
      <TabBar
        active={1}
        items={[
          { label: 'Início',     icon: Icon.Home() },
          { label: 'Histórico',  icon: Icon.History(MR.primary) },
          { label: 'Perfil',     icon: Icon.Settings() },
        ]}
      />
    </Phone>
  );
}

function ColetaRowProdutorBig({ row }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
      <PhotoStripe caption="" width={56} height={56} rounded={12} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, color: MR.ink, letterSpacing: -0.2 }}>{row.date}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: MR.ink2, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: MR.font.mono, fontWeight: 700 }}>{row.time}</span>
          <span style={{ width: 3, height: 3, borderRadius: 1.5, background: MR.ink3 }} />
          <SyncBadge state="synced" />
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: MR.font.mono, fontSize: 20, fontWeight: 800, color: MR.ink }}>{row.volume} <span style={{ fontSize: 12, color: MR.ink2 }}>L</span></div>
        <div style={{ fontFamily: MR.font.mono, fontSize: 11.5, fontWeight: 700, color: MR.ink3, marginTop: 2 }}>R$ {(row.volume * PRICE_PER_LITER).toFixed(2).replace('.', ',')}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ProdutorHome, ProdutorHomeAlt, ProdutorHistorico });
