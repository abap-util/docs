# business-api

[business-api](https://github.com/abap-util/business-api) is the sibling repository of abap-util: class-based access to the SAP logistics BAPIs for Standard ABAP. One class per business object, every action of that object a static method, and one error and commit contract for all of them.

::: warning Experimental — not yet verified on a system
The classes pass the syntax check, the method contract check and the unit tests of package 00, all without an SAP system. The SAP standard types are unknown to these checks, so no BAPI call, parameter name or field name has been confirmed by an activation or a run yet. Expect activation errors and wrong field names; do not use it productively. Reports from a real system are the most useful contribution right now — please [open an issue](https://github.com/abap-util/business-api/issues).
:::

## Key Features

- One class per business object — sales order, delivery, handling unit, goods movement, transfer order, production order, notification, …
- Every action is a static method with the same contract: `iv_commit` in, `ev_is_error` and `et_bapiret` out
- No exception leaves a method — classic exceptions and runtime errors come back as `BAPIRET2` messages
- SD, MM, LE-WM, EWM, PP, PM, QM and CA in one repository; the EWM classes reach `/SCWM/` dynamically, so everything activates in systems without EWM
- 18 and 40 character material numbers on ECC and S/4HANA alike

## Compatibility and Installation

- S/4HANA on-premise and private cloud
- ECC 6.0 — from NetWeaver 7.40 SP08 on `main`, from 7.02 on the branch `702`
- Standard ABAP only — the wrapped BAPIs are not released for ABAP Cloud

Install via [abapGit](https://abapgit.org) from `https://github.com/abap-util/business-api` and pick the branch that fits the system:

| Branch | For |
| --- | --- |
| `main` | NetWeaver 7.40 SP08 and higher, S/4HANA |
| `702` | NetWeaver 7.02 to 7.31 — downported from `main` on every push |
| `rename_<name>` | A second installation under another name, built on request with the workflow `build_rename` |

business-api has no dependency to install — not even abap-util, see [below](#how-it-consumes-abap-util).

## The Method Contract

Every method has the same shape:

```abap
CLASS-METHODS <action>
  IMPORTING
    <api-specific input>
    iv_commit   TYPE abap_bool DEFAULT abap_false   " write methods only
  EXPORTING
    <api-specific output>
    ev_is_error TYPE abap_bool
    et_bapiret  TYPE bapirettab.
```

| Parameter | Meaning |
| --- | --- |
| `iv_commit` | `abap_true` commits on success and rolls back on error. `abap_false` (the default): the caller owns the LUW, the method neither commits nor rolls back — several calls can be committed together. Read methods have no `iv_commit`. |
| `ev_is_error` | `abap_true` if `et_bapiret` holds a message of type E, A or X. |
| `et_bapiret` | Every message as `BAPIRET2` — of the BAPI, of a classic exception (from `sy-msg`), of a runtime error and of own checks. Cleared at the start of the method. |

- **Static methods, no state.**
- **No exception leaves a method.** Classic exceptions and runtime errors are caught and returned in `et_bapiret`.
- **Complex input stays a BAPI structure** (`is_header TYPE bapisdhd1`); convenience methods with simple parameters cover the common cases.
- **The one exception** to the contract is `zabaputil_cl_bus_ca_status=>check_is_set`: a predicate that returns a boolean and has no message to return.

```abap
zabaputil_cl_bus_mm_goodsmvt=>transfer_storage_location(
  EXPORTING iv_matnr      = lv_matnr
            iv_werks      = '1000'
            iv_lgort_from = '0001'
            iv_lgort_to   = '0002'
            iv_menge      = 5
            iv_meins      = 'PC'
            iv_commit     = abap_true          " commit on success, rollback on error
  IMPORTING ev_mblnr      = DATA(lv_mblnr)
            ev_is_error   = DATA(lv_is_error)  " abap_true if a message of type E, A or X came back
            et_bapiret    = DATA(lt_bapiret) ). " all messages as BAPIRET2
```

The contract is checked on the source of every business class by `npm run contract` in the business-api repository.

## Objects

| Module | Class | Methods |
| --- | --- | --- |
| SD | `zabaputil_cl_bus_sd_order` | `create`, `read`, `change`, `change_quantity`, `delete_item`, `delete` |
| SD | `zabaputil_cl_bus_sd_delivery` | `create_from_order`, `read`, `change_quantity`, `post_goods_issue`, `reverse_goods_issue`, `delete_item`, `delete` |
| SD | `zabaputil_cl_bus_sd_shipment` | `create`, `read`, `set_status`, `add_deliveries`, `remove_deliveries`, `change_carrier` |
| SD | `zabaputil_cl_bus_sd_hu` | `create`, `read`, `pack_material`, `pack_hu`, `unpack_material`, `unpack_hu`, `delete` |
| SD | `zabaputil_cl_bus_sd_serial` | `read`, `read_by_delivery` |
| MM | `zabaputil_cl_bus_mm_material` | `read`, `change`, `change_weight`, `change_mrp_controller`, `set_deletion_flag` |
| MM | `zabaputil_cl_bus_mm_goodsmvt` | `create`, `transfer_storage_location`, `transfer_plant`, `transfer_stock_type`, `goods_issue_order`, `goods_issue_reservation`, `goods_receipt_initial`, `cancel` |
| MM | `zabaputil_cl_bus_mm_inventory` | `create`, `count`, `post_differences` |
| MM | `zabaputil_cl_bus_mm_po` | `read`, `change`, `set_deletion_flag` |
| MM | `zabaputil_cl_bus_mm_preq` | `release`, `reset_release` |
| WM | `zabaputil_cl_bus_wm_to` | `create`, `create_from_delivery`, `create_from_requirement`, `read`, `confirm`, `cancel` |
| WM | `zabaputil_cl_bus_wm_tr` | `create`, `read`, `cancel` |
| WM | `zabaputil_cl_bus_wm_su` | `read`, `move` |
| EWM | `zabaputil_cl_bus_ewm_wt` | `create_hu`, `read`, `confirm`, `cancel` |
| EWM | `zabaputil_cl_bus_ewm_hu` | `read`, `read_by_bin` |
| EWM | `zabaputil_cl_bus_ewm_stock` | `read_bin`, `read_by_bin` |
| EWM | `zabaputil_cl_bus_ewm_resource` | `read` |
| PP | `zabaputil_cl_bus_pp_order` | `read`, `release`, `check_availability`, `complete_technically` |
| PP | `zabaputil_cl_bus_pp_confirm` | `read_proposal`, `create`, `cancel` |
| PM | `zabaputil_cl_bus_pm_notif` | `create`, `read`, `change`, `complete_task`, `close` |
| PM | `zabaputil_cl_bus_pm_measure` | `create`, `read_last` |
| PM | `zabaputil_cl_bus_pm_equipment` | `create`, `read`, `change` |
| QM | `zabaputil_cl_bus_qm_notif` | `create`, `read`, `add_defects` |
| QM | `zabaputil_cl_bus_qm_insp_lot` | `read`, `set_usage_decision` |
| CA | `zabaputil_cl_bus_ca_status` | `read`, `check_is_set`, `set_user_status` |
| CA | `zabaputil_cl_bus_ca_classif` | `read`, `change` |

Class names follow `zabaputil_cl_bus_<module>_<object>`.

## How It Consumes abap-util {#how-it-consumes-abap-util}

business-api does not depend on an installed abap-util. Its package `src/00` carries **renamed copies** of the abap-util classes it needs — the [consumption model](./architecture#consumption-model) every abap-util consumer follows. The rename is mechanical: `bus_` is inserted after `zabaputil_cl_` / `zabaputil_cx_`, the rest of the name stays, so every copy names its master.

| Copy in business-api | Master in abap-util | Scope |
| --- | --- | --- |
| `zabaputil_cl_bus_util_context` | `zabaputil_cl_util_context` | trimmed to the `bapi_*` methods and `conv_alpha_in` with their helpers |
| `zabaputil_cx_bus_util_error` | `zabaputil_cx_util_error` | as is |

What every business method uses comes from the `bapi_*` methods of the context class:

| Method | Purpose |
| --- | --- |
| `zabaputil_cl_bus_util_context=>bapi_finish` | Sets the error flag and commits or rolls back — the last call of every method |
| `zabaputil_cl_bus_util_context=>bapi_set_material` | Fills the material number with 18 or 40 characters, whichever the system has |
| `zabaputil_cl_bus_util_context=>bapi_refresh_buffers` | Resets the buffers before a write that reads delivery, HU or serial number data |
| `zabaputil_cl_bus_util_context=>bapi_call_function` | Dynamic function call — how the EWM classes reach `/SCWM/` without a static reference |
| `zabaputil_cl_bus_util_context=>conv_alpha_in` | Conversion exit ALPHA (input) with a variable length |

The same methods exist in the master, `zabaputil_cl_util_context`, where they are unit-tested.

Which abap-util commit the copies were taken from is recorded in business-api's `.github/abap-util.json`. abap-util's `sync-check` script reads that file and compares every copy with its master; business-api runs it on every pull request, so a change in a copy is either synced back to abap-util or named in the manifest with its reason.
