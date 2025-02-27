import { beforeEach, describe, expect, it } from "vitest"
import HashParser from "../src/hashparser.js"

describe("hashParser", () => {
  // Before each test, clear the URL hash.
  beforeEach(() => {
    // Remove hash from URL
    history.replaceState(null, null, window.location.pathname + window.location.search)
    window.location.hash = ""
  })

  it("should set and get a parameter", () => {
    const hp = new HashParser({ sync: false })
    hp.set("foo", "bar")

    // The value when retrieving via get() should be 'bar'
    expect(hp.get("foo")).toBe("bar")

    // The window hash should match the set value (encoded with encodeURIComponent)
    expect(window.location.hash).toBe("#foo=bar")
  })

  it("should return a default value when the key does not exist", () => {
    const hp = new HashParser({ sync: false })
    const defaultValue = "default"
    expect(hp.get("nonexistent", defaultValue)).toBe(defaultValue)
  })

  it("should delete an existing key", () => {
    const hp = new HashParser({ sync: false })
    hp.set("key", "value")
    expect(window.location.hash).toBe("#key=value")

    hp.delete("key")

    // After deletion, get() should return undefined as the key is missing
    expect(hp.get("key")).toBeUndefined()
    // And the URL hash should be removed (i.e., empty string)
    expect(window.location.hash).toBe("")
  })

  it("should clear all keys", () => {
    const hp = new HashParser({ sync: false })
    hp.set("key1", "value1")
    hp.set("key2", "value2")

    hp.clear()

    expect(hp.get("key1")).toBeUndefined()
    expect(hp.get("key2")).toBeUndefined()
    expect(window.location.hash).toBe("")
  })

  it("should check the existence of a key", () => {
    const hp = new HashParser({ sync: false })
    hp.set("exists", "val")
    expect(hp.has("exists")).toBe(true)
    hp.delete("exists")
    expect(hp.has("exists")).toBe(false)
  })

  describe("encoded values", () => {
    it("should encode values when encoded option is true", () => {
      const hp = new HashParser({ encoded: true, sync: false })
      hp.set("foo", "bar")

      // The encoded value is the base64 JSON string, then URL‑encoded as stored by URLSearchParams.
      const rawEncodedValue = btoa(JSON.stringify("bar"))
      const expectedEncodedValue = encodeURIComponent(rawEncodedValue)

      // Verify that the hash reflects the URL‑encoded value.
      expect(window.location.hash).toBe(`#foo=${expectedEncodedValue}`)

      // Ensure that get() returns the decoded value.
      expect(hp.get("foo")).toBe("bar")
    })
  })

  describe("static encoded accessor", () => {
    it("should create a HashParser instance with encoding enabled using the static getter", () => {
      const hp = HashParser.encoded
      hp.set("encodedKey", "encodedValue")

      const rawEncodedValue = btoa(JSON.stringify("encodedValue"))
      const expectedEncodedValue = encodeURIComponent(rawEncodedValue)

      expect(window.location.hash).toBe(`#encodedKey=${expectedEncodedValue}`)
      expect(hp.get("encodedKey")).toBe("encodedValue")
    })
  })

  describe("sync behavior with hashchange events", () => {
    it("should update internal parameters on hashchange event", () => {
      const hp = new HashParser({ sync: true })

      // Change the hash externally and dispatch the event.
      window.location.hash = "#new=param"
      window.dispatchEvent(new HashChangeEvent("hashchange"))

      // The parser should now reflect the updated hash.
      expect(hp.get("new")).toBe("param")
    })
  })
})
