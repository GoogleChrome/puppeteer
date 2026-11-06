---
sidebar_label: RemoteException.name
---

# RemoteException.name() method

The name of the exception, for example `Error`, `TypeError` or `SyntaxError`.

### Signature

```typescript
class RemoteException {
  name(): string | null;
}
```

**Returns:**

string \| null

## Remarks

Empty string if the thrown value is a primitive rather than an object.

Always `null` with WebDriver BiDi, which does not report the name of the exception.
