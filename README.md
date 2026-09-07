# 空まで、豆の木。

スマホ・PC・ゲームパッド対応の縦スクロールジャンプゲームです。

## 起動

`index.html` をブラウザで開くと遊べます。Node.js がある場合は `node build.cjs`、`node serve.cjs` の順に実行し、`http://localhost:4173` を開けます。スマホは同じWi-FiでPCのIPアドレスとポート4173へアクセスするか、公開済みのURLを使用してください。

## 操作

- スマホ：画面を左右にスライドすると、その方向に移動。指を離すと移動入力が止まります（風の影響は続きます）。短いタップでジャンプ。移動の指を押さえたまま別の指でタップすることもできます。
- キーボード：← → または A / D で移動。Space または ↑ でジャンプ。Esc で一時停止。
- 標準ゲームパッド：左スティック / 十字キーで移動。A（標準ボタン0）でジャンプ。Start（標準ボタン9）で一時停止。接続後にボタンを一度押してください。ブラウザと機種によって対応状況が異なります。
- 画面外に落ちると終了。600 m でクリア。別のタブに切り替えると自動停止します。

## デザイン差し替え

`assets/storybook.png` が仮の画像素材です。`assets.js` の `BEAN_ASSETS.sprites` にそれぞれの画像設定があります。

アトラスを差し替える場合は `atlas` と `crop: [左端, 上端, 幅, 高さ]` を変更します。個別画像を使う場合は、対象の設定を `player: { src: 'assets/player.png', width: 49, height: 58 }` のように変更してください。葉・巨人・つるも `src` に対応します。背景画像は `background: { src: 'assets/background.png' }` で差し替えられます。背景の色は `game.js` の描画関数にあります。

プレイヤーの表示サイズは `width` / `height`、当たり判定は `BEAN_CONFIG.playerHalfWidth`（着地は足元の座標で判定）、物理設定は `gravity` / `jumpSpeed` / `moveSpeed` / `maxWindSpeed` で独立して設定できます。葉の足場の幅は `engine.js` の `platforms` の `w`、高さは `y` です。画像を変更した後は `node build.cjs` で配信用ファイルを更新してください。

## 確認

`node tests/controls.test.cjs` でタッチ・ゲームパッド入力を、`node tests/engine.test.cjs` で、ジャンプ高度、風、一時停止、最大風量での全行程クリア、落下・リセットを確認します。スマホと物理ゲームパッドの実機確認は別途必要です。

## 仮素材

組み込み ImageGen で生成した透明背景の素材です。生成プロンプト：Transparent PNG sprite atlas for a browser canvas platform game. Square 1024×1024, four equal quadrants with generous transparent margins. Top-left friendly small boy adventurer, full body, red scarf, green tunic, brown boots, facing right. Top-right broad horizontal green leaf platform. Bottom-left friendly huge bearded giant upper body. Bottom-right vertical twisted green beanstalk segment with small leaves. Charming hand-painted storybook gouache, rich emerald and teal with golden accents, readable silhouettes and painterly texture. Exactly four isolated sprites, genuine alpha transparency, no scenery, text, watermark, grid lines, or labels.


