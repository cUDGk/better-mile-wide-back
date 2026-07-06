<div align="center">

# Better Mile Wide Back

### 画面左端クリックで「戻る」— Manifest V3 対応版

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](content.js)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?style=flat&logo=googlechrome&logoColor=white)](manifest.json)
[![License: MPL-2.0](https://img.shields.io/badge/License-MPL--2.0-orange?style=flat)](LICENSE)

**公式の Mile Wide Back が Chrome で使えなくなったので、Manifest V3 に移植して作り直した**

---

</div>

## 概要

公式の [Mile Wide Back](https://github.com/em-te/webextensions-mile-wide-back) は Manifest V2 のまま更新が止まり、Chrome の MV2 廃止に伴い「ベスト プラクティスに沿わないため利用できなくなりました」と表示されて無効化された。本リポジトリは公式リポジトリをフォークし、Manifest V3 へ移植したもの。機能・操作感は元のまま。

ブラウザウィンドウの左端がボタンになる。マウスを左に投げるだけで届くので、狙いを付ける必要がない（Fitts の法則）。

## 特徴

| 操作（ウィンドウ左端で） | 動作 |
|---|---|
| 左クリック | 戻る |
| 右クリック | 進む |
| 中クリック | 現在のタブを閉じる |
| 左右同時クリック | 新しいタブを開く |
| ホイール回転 | タブを順に切り替え |

## MV2 からの変更点

| ファイル | 変更 |
|---|---|
| `manifest.json` | `manifest_version: 3` 化。background を service worker に、`<all_urls>` を `host_permissions` に移動。リポジトリに同梱されていないアイコン PNG の定義を削除 |
| `background.js` | MV3 で廃止された `chrome.tabs.executeScript` フォールバックを削除し `tabs.goBack` / `goForward` に一本化。`storage.onChanged` のキー未定義ガードを追加 |
| `options.js` | 廃止 API `chrome.extension.getURL` → `chrome.runtime.getURL` |

## インストール

1. このリポジトリをクローンまたはダウンロードする
2. Chrome で `chrome://extensions` を開く
3. 右上の「デベロッパー モード」を ON にする
4. 「パッケージ化されていない拡張機能を読み込む」でこのフォルダを選択する

## 使い方

ウィンドウを**最大化**した状態で、マウスを画面左端まで振ってクリックするだけ。設定画面（拡張機能のオプション）でホイールのタブ切り替えの無効化と、`tabs` 権限の付与（内部ページをタブ切り替え対象から除外）ができる。

## 制限

- ウィンドウが最大化されていないと反応しない（`screenX === 0` で左端を検出しているため）
- Web ページが表示されているタブでのみ動く。`chrome://` 系の内部ページ・ブラウザのエラーページでは拡張機能が動作を許可されていないため反応しない

## Attribution

本リポジトリは Terry 氏 (em-te) の [webextensions-mile-wide-back](https://github.com/em-te/webextensions-mile-wide-back) のフォーク。オリジナルの設計・実装はすべて原作者によるもの。

## ライセンス

[MPL-2.0](LICENSE)（オリジナルのライセンスを継承）
