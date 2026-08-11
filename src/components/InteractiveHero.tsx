import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Stripe-style ribbon wave shader + Dynamic Random Opacity Breathing (20% - 100%)
 */
function StripeWaveShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  }, [size])

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()

    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.04
    )
  })

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // ── Simplex 2D noise ──
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(
        0.211324865405187, 0.366025403784439,
        -0.577350269189626, 0.024390243902439
      );
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // ── Ribbon SDF ──
    vec3 ribbon(vec2 p, vec2 mouseP, float rightAnchor, float baseFreq, float baseAmp, float phase, float width) {
      float path = rightAnchor + sin(p.y * baseFreq + phase) * baseAmp;
      path += sin(p.y * baseFreq * 0.8 + phase * 1.1) * baseAmp * 0.25;
      path += snoise(vec2(p.y * 0.25 + phase * 0.08, phase * 0.04)) * baseAmp * 0.15;

      vec2 ptOnPath = vec2(path, p.y);
      vec2 diff = ptOnPath - mouseP;
      float distSq = dot(diff, diff);
      
      float push = exp(-distSq * 3.5) * 0.18;
      path += diff.x * push;

      float d = p.x - path;
      float w = width * (0.85 + 0.15 * sin(p.y * baseFreq * 0.5 + phase));

      float across = clamp(d / w, -1.0, 1.0);
      float edge = 1.0 - smoothstep(0.85, 1.0, abs(across));

      return vec3(edge, across, w);
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;

      vec2 mouseP = uMouse * vec2(aspect, 1.0);
      float t = uTime * 0.12;

      float anchor = aspect * 0.45;

      vec3 r1 = ribbon(p, mouseP, anchor - 0.04, 1.1, 0.16, t,        0.24);
      vec3 r2 = ribbon(p, mouseP, anchor - 0.01, 1.1, 0.16, t + 0.15, 0.20);
      vec3 r3 = ribbon(p, mouseP, anchor + 0.01, 1.1, 0.16, t + 0.30, 0.22);
      vec3 r4 = ribbon(p, mouseP, anchor + 0.04, 1.1, 0.16, t + 0.45, 0.18);
      vec3 r5 = ribbon(p, mouseP, anchor + 0.07, 1.1, 0.16, t + 0.60, 0.16);

      // Micro-stripes
      float lines1 = 0.5 + 0.5 * cos(r1.y * 32.0);
      float lines2 = 0.5 + 0.5 * cos(r2.y * 28.0);
      float lines3 = 0.5 + 0.5 * cos(r3.y * 36.0);
      float lines4 = 0.5 + 0.5 * cos(r4.y * 24.0);
      float lines5 = 0.5 + 0.5 * cos(r5.y * 30.0);

      // Shading
      float diff1 = (0.55 + 0.45 * cos(r1.y * 1.2)) * (0.85 + 0.15 * lines1);
      float diff2 = (0.55 + 0.45 * cos(r2.y * 1.2)) * (0.85 + 0.15 * lines2);
      float diff3 = (0.55 + 0.45 * cos(r3.y * 1.2)) * (0.85 + 0.15 * lines3);
      float diff4 = (0.55 + 0.45 * cos(r4.y * 1.2)) * (0.85 + 0.15 * lines4);
      float diff5 = (0.55 + 0.45 * cos(r5.y * 1.2)) * (0.85 + 0.15 * lines5);

      float spec1 = pow(max(0.0, 1.0 - abs(r1.y - 0.2) * 2.5), 5.0) * 0.7;
      float spec2 = pow(max(0.0, 1.0 - abs(r2.y + 0.1) * 2.8), 5.0) * 0.6;
      float spec3 = pow(max(0.0, 1.0 - abs(r3.y - 0.15) * 3.0), 5.0) * 0.55;
      float spec4 = pow(max(0.0, 1.0 - abs(r4.y + 0.25) * 2.6), 5.0) * 0.5;
      float spec5 = pow(max(0.0, 1.0 - abs(r5.y - 0.05) * 2.7), 5.0) * 0.45;

      float shade1 = diff1 + spec1;
      float shade2 = diff2 + spec2;
      float shade3 = diff3 + spec3;
      float shade4 = diff4 + spec4;
      float shade5 = diff5 + spec5;

      // ── Organic Random Opacity Breathing per strand (20% to 100%) ──
      float op1 = clamp(0.60 + 0.40 * sin(t * 2.5 + snoise(vec2(1.0, t * 0.4)) * 3.0), 0.20, 1.0);
      float op2 = clamp(0.60 + 0.40 * sin(t * 1.9 + 1.7 + snoise(vec2(2.0, t * 0.3)) * 3.0), 0.20, 1.0);
      float op3 = clamp(0.60 + 0.40 * sin(t * 2.2 + 3.4 + snoise(vec2(3.0, t * 0.5)) * 3.0), 0.20, 1.0);
      float op4 = clamp(0.60 + 0.40 * sin(t * 1.6 + 4.9 + snoise(vec2(4.0, t * 0.35)) * 3.0), 0.20, 1.0);
      float op5 = clamp(0.60 + 0.40 * sin(t * 2.8 + 2.2 + snoise(vec2(5.0, t * 0.45)) * 3.0), 0.20, 1.0);

      // Colors
      vec3 col1 = vec3(0.58, 0.55, 0.52);
      vec3 col2 = vec3(0.44, 0.42, 0.40);
      vec3 col3 = vec3(0.32, 0.30, 0.28);
      vec3 col4 = vec3(0.24, 0.23, 0.22);
      vec3 col5 = vec3(0.18, 0.17, 0.16);

      vec3 color = vec3(0.0);
      color += r5.x * shade5 * col5 * 1.0 * op5;
      color += r4.x * shade4 * col4 * 1.1 * op4;
      color += r3.x * shade3 * col3 * 1.2 * op3;
      color += r2.x * shade2 * col2 * 1.3 * op2;
      color += r1.x * shade1 * col1 * 1.4 * op1;

      color += snoise(uv * 500.0) * 0.01;

      float alpha = max(
        max(max(r1.x * shade1 * op1, r2.x * shade2 * op2), r3.x * shade3 * op3), 
        max(r4.x * shade4 * op4, r5.x * shade5 * op5)
      );
      alpha = pow(alpha, 0.6);

      float vig = 1.0 - pow(length(uv - 0.5) * 1.1, 2.0);
      color *= max(vig, 0.0);
      alpha *= max(vig, 0.0);

      gl_FragColor = vec4(color, alpha * 0.95);
    }
  `

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

/**
 * Gentle Micro Round Mouse-Repelling 3D Dust Particles (420 count)
 */
function InteractiveDustParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 420

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.3, 'rgba(237, 237, 237, 0.6)')
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  const [positions, initialPositions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const initPos = new Float32Array(count * 3)
    const spd = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.25) * 4.8 + 1.2
      const y = (Math.random() - 0.5) * 6.5
      const z = (Math.random() - 0.5) * 2.5

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      initPos[i * 3] = x
      initPos[i * 3 + 1] = y
      initPos[i * 3 + 2] = z

      spd[i * 3] = (Math.random() - 0.5) * 0.001
      spd[i * 3 + 1] = (Math.random() + 0.1) * 0.0015
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }

    return [pos, initPos, spd]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position
    const t = state.clock.getElapsedTime()

    const mouseX = state.pointer.x * 4.2
    const mouseY = state.pointer.y * 2.8

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i)
      let y = posAttr.getY(i)
      let z = posAttr.getZ(i)

      initialPositions[i * 3 + 1] += speeds[i * 3 + 1]
      if (initialPositions[i * 3 + 1] > 3.4) {
        initialPositions[i * 3 + 1] = -3.4
        posAttr.setY(i, -3.4)
        y = -3.4
      }

      const targetX = initialPositions[i * 3] + Math.sin(t * 0.4 + i) * 0.08
      const targetY = initialPositions[i * 3 + 1]
      const targetZ = initialPositions[i * 3 + 2] + Math.cos(t * 0.4 + i) * 0.08

      const dx = x - mouseX
      const dy = y - mouseY
      const distSq = dx * dx + dy * dy
      const radiusSq = 2.8

      if (distSq < radiusSq && distSq > 0.001) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / Math.sqrt(radiusSq)) * 0.035
        x += (dx / dist) * force
        y += (dy / dist) * force
      }

      x += (targetX - x) * 0.02
      y += (targetY - y) * 0.02
      z += (targetZ - z) * 0.02

      posAttr.setXYZ(i, x, y, z)
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#EDEDED"
        map={circleTexture || undefined}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function InteractiveHero() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <StripeWaveShader />
        <InteractiveDustParticles />
      </Canvas>
    </div>
  )
}
